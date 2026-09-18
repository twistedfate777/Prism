// PROTECT module — deterministic pipeline, no AI
// Runs: OCR → PII regex detection → Face detection
// All processing is in-memory only.

const Tesseract = require('tesseract.js');
const path = require('path');
const sharp = require('sharp');
const { FaceDetector, FilesetResolver } = require('@mediapipe/tasks-vision');

// ─── PII Regex Patterns ────────────────────────────────────────────
const PII_PATTERNS = [
  {
    type: 'phone_number',
    // Indonesian phone formats: 08xx-xxxx-xxxx, +62xxx, 62xxx
    regex: /(\+62|62|0)8\d{1,2}[\s\-.]?\d{3,4}[\s\-.]?\d{3,4}/g,
    severity: 'red',
  },
  {
    type: 'email',
    regex: /[\w.\-+]+@[\w.\-]+\.\w{2,}/g,
    severity: 'red',
  },
  {
    type: 'id_number',
    // Indonesian KTP number: 16 digits
    regex: /\b\d{16}\b/g,
    severity: 'red',
  },
];

const SENSITIVE_DOCUMENT_PATTERNS = [
  { type: 'academic_record', severity: 'yellow', label: 'Academic record detected', pattern: /report\s+card|grade\s+report|transcript|student\s+(?:id|number)|semester|gpa|academic\s+record/i },
];

// ─── OCR ────────────────────────────────────────────────────────────

/**
 * Run OCR on an image buffer and extract text + word bounding boxes.
 * @param {Buffer} imageBuffer
 * @returns {Promise<{text: string, words: Array<{text: string, bbox: [number,number,number,number]}>}>}
 */
async function runOCR(imageBuffer) {
  try {
    const { data } = await Tesseract.recognize(imageBuffer, 'eng+ind', {
      logger: () => {}, // suppress progress logs
    });

    const words = (data.words || []).map(w => ({
      text: w.text,
      bbox: [
        w.bbox.x0,
        w.bbox.y0,
        w.bbox.x1 - w.bbox.x0, // width
        w.bbox.y1 - w.bbox.y0, // height
      ],
    }));

    return { text: data.text || '', words };
  } catch (err) {
    console.error('[PROTECT] OCR failed:', err.message);
    return { text: '', words: [] };
  }
}

// ─── PII Detection ─────────────────────────────────────────────────

/**
 * Scan OCR output for PII matches. Returns flags with bounding boxes
 * derived from matching OCR word positions when possible.
 *
 * @param {{ text: string, words: Array<{text: string, bbox: number[]}> }} ocrResult
 * @returns {{ matches: Array<{type: string, severity: string, value: string, bbox: number[]|null}>, sanitizedText: string }}
 */
function detectPII(ocrResult) {
  const { text, words } = ocrResult;
  const matches = [];
  let sanitizedText = text;

  for (const pattern of PII_PATTERNS) {
    let match;
    // Reset regex lastIndex
    pattern.regex.lastIndex = 0;
    while ((match = pattern.regex.exec(text)) !== null) {
      const matchedText = match[0];

      // Try to find bounding box from OCR word positions
      const bbox = findBboxForMatch(matchedText, words);

      matches.push({
        type: pattern.type,
        severity: pattern.severity,
        value: matchedText,
        bbox,
      });

      // Redact from sanitized text
      sanitizedText = sanitizedText.replace(matchedText, '[REDACTED]');
    }
  }

  return { matches, sanitizedText };
}

function detectSensitiveDocument(text) {
  const normalizedText = text || '';
  const matchedSignals = SENSITIVE_DOCUMENT_PATTERNS.filter(item => item.pattern.test(normalizedText));
  if (matchedSignals.length === 0) return [];

  return matchedSignals.map(signal => ({
    type: signal.type,
    severity: signal.severity,
    label: signal.label,
    value: 'document content',
    bbox: null,
  }));
}

/**
 * Try to find a bounding box for a matched text string
 * by looking at OCR word positions.
 */
function findBboxForMatch(matchedText, words) {
  // Normalize the match for comparison
  const normalizedMatch = matchedText.replace(/[\s\-.]/g, '');

  // Try exact word match first
  for (const word of words) {
    const normalizedWord = word.text.replace(/[\s\-.]/g, '');
    if (normalizedWord.includes(normalizedMatch) || normalizedMatch.includes(normalizedWord)) {
      return word.bbox;
    }
  }

  // Try to find consecutive words that form the match
  for (let i = 0; i < words.length; i++) {
    let combined = '';
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;

    for (let j = i; j < Math.min(i + 5, words.length); j++) {
      combined += words[j].text.replace(/[\s\-.]/g, '');
      const [x, y, w, h] = words[j].bbox;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);

      if (combined.includes(normalizedMatch)) {
        return [minX, minY, maxX - minX, maxY - minY];
      }
    }
  }

  return null;
}

// ─── Face Detection (MediaPipe) ────────────────────────────────────

let faceDetector = null;
let faceDetectionInitPromise = null;

/**
 * Initialize MediaPipe FaceDetector.
 * Called once, lazily.
 */
async function initFaceDetection() {
  if (faceDetector) return;
  if (faceDetectionInitPromise) return faceDetectionInitPromise;

  faceDetectionInitPromise = (async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      
      const modelPath = path.join(__dirname, '..', 'models', 'blaze_face_short_range.tflite');
      
      faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: "CPU"
        },
        runningMode: "IMAGE"
      });
      
      console.log('[PROTECT] MediaPipe Face detection model loaded');
    } catch (err) {
      console.error('[PROTECT] Face detection init failed:', err.message);
      faceDetectionInitPromise = null;
    }
  })();

  return faceDetectionInitPromise;
}

/**
 * Detect faces in an image buffer. Returns bounding boxes only.
 * No recognition/identification is performed.
 *
 * @param {Buffer} imageBuffer
 * @returns {Promise<Array<{bbox: [number,number,number,number]}>>}
 */
async function detectFaces(imageBuffer) {
  try {
    await initFaceDetection();

    if (!faceDetector) {
      console.warn('[PROTECT] Face detection not available, skipping');
      return [];
    }

    // Convert Buffer to raw pixel data using Sharp for MediaPipe
    const { data, info } = await sharp(imageBuffer)
      .ensureAlpha() // MediaPipe usually wants RGBA
      .raw()
      .toBuffer({ resolveWithObject: true });

    const imageObject = {
      data: new Uint8ClampedArray(data),
      width: info.width,
      height: info.height,
    };

    const detections = faceDetector.detect(imageObject);

    if (!detections || !detections.detections) return [];

    return detections.detections.map(d => {
       const box = d.boundingBox;
       return {
         bbox: [
           Math.round(box.originX),
           Math.round(box.originY),
           Math.round(box.width),
           Math.round(box.height),
         ],
       };
    });
  } catch (err) {
    console.error('[PROTECT] Face detection failed:', err.message);
    return [];
  }
}

// ─── Full PROTECT Pipeline ──────────────────────────────────────────

/**
 * Run the full PROTECT pipeline on an image and/or text.
 *
 * @param {Buffer|null} imageBuffer
 * @param {string|null} rawText - text input (if no image)
 * @returns {Promise<{flags: Array, sanitizedText: string}>}
 */
async function runProtect(imageBuffer, rawText) {
  const flags = [];
  let sanitizedText = rawText || '';

  if (imageBuffer) {
    // Run OCR and face detection in parallel
    const [ocrResult, faces] = await Promise.all([
      runOCR(imageBuffer),
      detectFaces(imageBuffer),
    ]);

    // PII detection on OCR output
    const piiResult = detectPII(ocrResult);
    sanitizedText = piiResult.sanitizedText;

    // Add PII flags
    for (const match of piiResult.matches) {
      flags.push({
        type: match.type,
        severity: match.severity,
        value: match.value,
        bbox: match.bbox,
      });
    }

    flags.push(...detectSensitiveDocument(ocrResult.text));

    // Add face flags
    for (const face of faces) {
      flags.push({
        type: 'face',
        severity: 'yellow',
        bbox: face.bbox,
      });
    }
  } else if (rawText) {
    // Text-only input: run PII regex on raw text
    const piiResult = detectPII({ text: rawText, words: [] });
    sanitizedText = piiResult.sanitizedText;

    for (const match of piiResult.matches) {
      flags.push({
        type: match.type,
        severity: match.severity,
        value: match.value,
        bbox: null,
      });
    }

    flags.push(...detectSensitiveDocument(rawText));
  }

  return { flags, sanitizedText };
}

module.exports = { runOCR, detectPII, detectFaces, detectSensitiveDocument, runProtect };
