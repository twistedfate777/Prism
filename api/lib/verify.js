// VERIFY module — P1 scaffold
// Extracts entities (dates, event names) from sanitized text
// and fuzzy-matches against a seed Living Content Database.
//
// SECURITY: Only accepts sanitized text (PII-redacted).

const path = require('path');
const fs = require('fs');

// Load seed database
let seedDB = [];
const seedPath = path.join(__dirname, '..', 'data', 'seed_database.json');
try {
  if (fs.existsSync(seedPath)) {
    seedDB = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  }
} catch (err) {
  console.warn('[VERIFY] Could not load seed database:', err.message);
}

/**
 * Simple date extraction from text.
 */
function extractDates(text) {
  const datePatterns = [
    /\b(\d{1,2}[\s/-]\w+[\s/-]\d{2,4})\b/g,      // 12 Jan 2024, 12/01/2024
    /\b(\w+ \d{1,2},?\s?\d{4})\b/g,                // January 12, 2024
    /\b(\d{4}[\s/-]\d{1,2}[\s/-]\d{1,2})\b/g,      // 2024-01-12
  ];

  const dates = [];
  for (const pattern of datePatterns) {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(text)) !== null) {
      dates.push(match[1]);
    }
  }
  return dates;
}

/**
 * Simple entity/keyword extraction from text.
 */
function extractEntities(text) {
  // Extract capitalized multi-word phrases (likely proper nouns/event names)
  const entityPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g;
  const entities = [];
  let match;
  while ((match = entityPattern.exec(text)) !== null) {
    entities.push(match[1]);
  }
  return entities;
}

/**
 * Fuzzy string similarity (Dice coefficient).
 */
function similarity(a, b) {
  const aNorm = a.toLowerCase().trim();
  const bNorm = b.toLowerCase().trim();
  if (aNorm === bNorm) return 1;

  const bigrams = (str) => {
    const result = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      result.add(str.substring(i, i + 2));
    }
    return result;
  };

  const aBigrams = bigrams(aNorm);
  const bBigrams = bigrams(bNorm);
  let intersection = 0;
  for (const bg of aBigrams) {
    if (bBigrams.has(bg)) intersection++;
  }
  return (2 * intersection) / (aBigrams.size + bBigrams.size);
}

/**
 * Run VERIFY: extract entities/dates from sanitized text and
 * compare against the seed database.
 *
 * @param {string} sanitizedText - MUST be PII-redacted text from PROTECT
 * @returns {Promise<{findings: Array<{entity: string, matchedEntry: object, note: string}>}>}
 */
async function runVerify(sanitizedText) {
  if (!sanitizedText || sanitizedText.trim().length === 0) {
    return { findings: [] };
  }

  if (seedDB.length === 0) {
    return { findings: [] };
  }

  const entities = extractEntities(sanitizedText);
  const dates = extractDates(sanitizedText);
  const findings = [];

  // Match entities against seed DB
  for (const entity of entities) {
    for (const entry of seedDB) {
      const sim = similarity(entity, entry.event_name || entry.name || '');
      if (sim > 0.6) {
        findings.push({
          entity,
          matchedEntry: {
            name: entry.event_name || entry.name,
            date: entry.date,
            last_updated: entry.last_updated,
            source: entry.source,
          },
          note: `This information may have changed since it was originally shared. Last updated: ${entry.last_updated || 'unknown'}.`,
        });
      }
    }
  }

  return { findings };
}

module.exports = { runVerify, extractDates, extractEntities };
