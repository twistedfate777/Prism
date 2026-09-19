// Metadata-only logger
// NEVER accepts image content, raw text, or PII values.
// Only structured enum/metric fields are logged.

/**
 * Log scan metadata. This function deliberately does NOT accept
 * free-text fields to prevent accidental PII logging.
 *
 * @param {object} meta
 * @param {string} meta.scan_id
 * @param {string} meta.destination_context - one of the destination enum values
 * @param {string[]} meta.modules_triggered - e.g. ['PROTECT', 'THINK']
 * @param {string} meta.risk_level - 'red' | 'yellow' | 'green'
 * @param {string} [meta.user_action] - 'protect' | 'continue' (set after action)
 * @param {string} meta.timestamp - ISO timestamp
 */
function logScanMetadata({ scan_id, destination_context, modules_triggered, risk_level, user_action, timestamp }) {
  const entry = {
    scan_id,
    destination_context,
    modules_triggered,
    risk_level,
    user_action: user_action || null,
    timestamp: timestamp || new Date().toISOString(),
  };

  // Validate: reject any unexpected fields
  const allowedKeys = new Set(['scan_id', 'destination_context', 'modules_triggered', 'risk_level', 'user_action', 'timestamp']);
  for (const key of Object.keys(entry)) {
    if (!allowedKeys.has(key)) {
      console.warn(`[PRISM Logger] Rejected unexpected field: ${key}`);
      delete entry[key];
    }
  }

  console.log('[PRISM Scan]', JSON.stringify(entry));
}

module.exports = { logScanMetadata };
