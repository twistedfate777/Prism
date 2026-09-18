// POST /api/action
// Accepts JSON: { scan_id, action: "protect" | "continue" }
// If "protect": applies blur to flagged bbox regions, returns modified image
// If "continue": returns original image unmodified
// Always generates a responsibility report.

const sharp = require('sharp');
const store = require('./lib/store');
const { logScanMetadata } = require('./lib/logger');
const { getFlagLabel } = require('./lib/moduleConfig');

/**
 * Apply Gaussian blur to specific bounding box regions in an image.
 *
 * @param {Buffer} imageBuffer - original image
 * @param {Array<{bbox: number[]}>} flags - flags with bounding boxes
 * @returns {Promise<Buffer>} - modified image with blurred regions
 */
async function applyBlurToRegions(imageBuffer, flags) {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get bboxes that are valid
  const bboxes = flags
    .filter(f => f.bbox && f.bbox.length === 4)
    .map(f => {
      // Clamp bbox to image dimensions
      let [x, y, w, h] = f.bbox;
      x = Math.max(0, Math.min(x, width - 1));
      y = Math.max(0, Math.min(y, height - 1));
      w = Math.min(w, width - x);
      h = Math.min(h, height - y);
      // Ensure minimum size
      w = Math.max(w, 1);
      h = Math.max(h, 1);
      return { x, y, w, h };
    })
    .filter(b => b.w > 0 && b.h > 0);

  if (bboxes.length === 0) {
    // No valid bboxes — return original
    return sharp(imageBuffer).png().toBuffer();
  }

  // Strategy: extract each region, blur it, composite back
  const composites = [];

  for (const bbox of bboxes) {
    try {
      const blurredRegion = await sharp(imageBuffer)
        .extract({ left: bbox.x, top: bbox.y, width: bbox.w, height: bbox.h })
        .blur(Math.max(15, Math.round(Math.min(bbox.w, bbox.h) / 3)))
        .toBuffer();

      composites.push({
        input: blurredRegion,
        left: bbox.x,
        top: bbox.y,
      });
    } catch (err) {
      console.error(`[/api/action] Failed to blur region:`, err.message);
      // Skip this region, continue with others
    }
  }

  if (composites.length === 0) {
    return sharp(imageBuffer).png().toBuffer();
  }

  return sharp(imageBuffer)
    .composite(composites)
    .png()
    .toBuffer();
}

/**
 * Generate responsibility report from scan results + user action.
 */
function generateReport(flags, action) {
  const flagSummaries = flags.map(f => getFlagLabel(f.type));

  const actionLabel = action === 'protect' ? 'protected and redacted sensitive areas' : 'continued without changes';

  return {
    summary: flags.length > 0
      ? `${flags.length} item(s) flagged. You ${actionLabel}.`
      : `No sensitive items detected. You ${actionLabel}.`,
    flags_addressed: flagSummaries,
    action_taken: action,
  };
}

/**
 * Express route handler for POST /api/action
 */
async function actionHandler(req, res) {
  let storedData = null;

  try {
    const { scan_id, action } = req.body || {};

    // Validate input
    if (!scan_id) {
      return res.status(400).json({ error: 'scan_id is required' });
    }
    if (!['protect', 'continue'].includes(action)) {
      return res.status(400).json({ error: 'action must be "protect" or "continue"' });
    }

    // Retrieve stored scan data
    storedData = store.get(scan_id);
    if (!storedData || !storedData.imageBuffer) {
      // No image stored — return report only (text-only scan or expired)
      const report = generateReport(storedData?.flags || [], action);

      // Log metadata
      logScanMetadata({
        scan_id,
        destination_context: 'unknown',
        modules_triggered: [],
        risk_level: 'green',
        user_action: action,
        timestamp: new Date().toISOString(),
      });

      return res.json({ report, image: null });
    }

    const { imageBuffer, flags } = storedData;

    // Generate report
    const report = generateReport(flags, action);

    let outputBuffer;
    if (action === 'protect') {
      // Apply blur to flagged regions
      outputBuffer = await applyBlurToRegions(imageBuffer, flags);
    } else {
      // Return original unmodified
      outputBuffer = await sharp(imageBuffer).png().toBuffer();
    }

    // Log metadata only
    logScanMetadata({
      scan_id,
      destination_context: 'unknown',
      modules_triggered: [],
      risk_level: flags.some(f => f.severity === 'red') ? 'red' : 'green',
      user_action: action,
      timestamp: new Date().toISOString(),
    });

    // Return both the report and the image
    // We'll send JSON with the report + base64 image
    const base64Image = outputBuffer.toString('base64');

    return res.json({
      report,
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (err) {
    console.error('[/api/action] Error:', err);
    return res.status(500).json({ error: 'Action failed. Please try again.' });
  } finally {
    // PRIVACY: Clean up stored data immediately after response
    if (req.body?.scan_id) {
      store.remove(req.body.scan_id);
    }
    storedData = null;
  }
}

module.exports = { actionHandler };
