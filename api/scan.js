// POST /api/scan
// Accepts multipart/form-data: image (file), text (string), destination (string)
// Runs the PROTECT pipeline (OCR + PII + face detection) and returns structured risk flags.

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { getDestinations, getModulesForDestination } = require('./lib/moduleConfig');
const { runProtect } = require('./lib/protect');
const { runThink } = require('./lib/think');
const { runVerify } = require('./lib/verify');
const store = require('./lib/store');
const { logScanMetadata } = require('./lib/logger');

// Use memory storage — NEVER write to disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}).single('image');

/**
 * Express route handler for POST /api/scan
 */
async function scanHandler(req, res) {
  let imageBuffer = null;

  try {
    const text = req.body?.text || '';
    const destination = req.body?.destination || 'social_media';
    imageBuffer = req.file?.buffer || null;

    // Validate destination
    const normalizedDest = destination.replace(/-/g, '_');
    const validDestinations = getDestinations().map(item => item.value);
    if (!validDestinations.includes(normalizedDest)) {
      return res.status(400).json({ error: `Invalid destination: ${destination}` });
    }

    // Validate input: must have either image or text
    if (!imageBuffer && !text.trim()) {
      return res.status(400).json({ error: 'No image or text provided' });
    }

    // Get modules to run for this destination
    const modules = getModulesForDestination(destination);
    const scanId = uuidv4();

    let flags = [];
    let sanitizedText = text;
    let thinkResult = null;
    let verifyResult = null;

    // ─── PROTECT (P0 — always runs if in module list) ──────────
    if (modules.includes('PROTECT')) {
      const protectResult = await runProtect(imageBuffer, text);
      flags = protectResult.flags;
      sanitizedText = protectResult.sanitizedText;
    }

    // ─── THINK (P1 — only if module is triggered AND Gemini key exists) ──
    if (modules.includes('THINK') && process.env.GEMINI_API_KEY) {
      // SECURITY: Only pass sanitizedText — never raw text or image
      thinkResult = await runThink(sanitizedText);
    }

    // ─── VERIFY (P1 — only if module is triggered) ──────────────
    if (modules.includes('VERIFY')) {
      // SECURITY: Only pass sanitizedText
      verifyResult = await runVerify(sanitizedText);
    }

    // ─── DECISION ENGINE ───────────────────────────────────────
    const hasRedFlags = flags.some(f => f.severity === 'red');
    const hasYellowFlags = flags.some(f => f.severity === 'yellow');
    const recommendedAction = hasRedFlags ? 'protect' : 'continue';
    const riskLevel = hasRedFlags ? 'red' : hasYellowFlags ? 'yellow' : 'green';

    // Store image buffer for the /api/action endpoint (with TTL)
    if (imageBuffer) {
      store.set(scanId, { imageBuffer: Buffer.from(imageBuffer), flags });
    }

    // Build response — exact contract for frontend Cue Card
    const response = {
      scan_id: scanId,
      flags,
      recommended_action: recommendedAction,
      destination: normalizedDest,
      modules_triggered: modules,
      sanitized_text: sanitizedText,
    };

    // Attach P1 results if available
    if (thinkResult) {
      response.think = thinkResult;
    }
    if (verifyResult && verifyResult.findings.length > 0) {
      response.verify = verifyResult;
    }

    // Log metadata only — no PII, no image content
    logScanMetadata({
      scan_id: scanId,
      destination_context: normalizedDest,
      modules_triggered: modules,
      risk_level: riskLevel,
      timestamp: new Date().toISOString(),
    });

    return res.json(response);
  } catch (err) {
    console.error('[/api/scan] Error:', err);
    return res.status(500).json({ error: 'Scan failed. Please try again.' });
  } finally {
    // PRIVACY: Null out the image buffer reference
    imageBuffer = null;
    if (req.file) {
      req.file.buffer = null;
    }
  }
}

module.exports = { scanHandler, upload };
