// In-memory store with TTL auto-cleanup
// Holds image buffers temporarily between /scan and /action calls.
// NEVER persists to disk. Auto-deletes after TTL_MS.

const TTL_MS = 5 * 60 * 1000; // 5 minutes

const store = new Map();
const timers = new Map();

/**
 * Store a scan entry (image buffer + metadata).
 * Automatically cleaned up after TTL.
 */
function set(scanId, data) {
  // Clear any existing timer for this ID
  if (timers.has(scanId)) {
    clearTimeout(timers.get(scanId));
  }

  store.set(scanId, data);

  // Schedule auto-cleanup
  const timer = setTimeout(() => {
    remove(scanId);
  }, TTL_MS);

  // Don't hold the process open for cleanup timers
  if (timer.unref) timer.unref();
  timers.set(scanId, timer);
}

/**
 * Get a scan entry by ID.
 */
function get(scanId) {
  return store.get(scanId) || null;
}

/**
 * Remove a scan entry and null out buffer references.
 */
function remove(scanId) {
  const entry = store.get(scanId);
  if (entry) {
    // Null out buffer references to aid GC
    if (entry.imageBuffer) {
      entry.imageBuffer = null;
    }
    store.delete(scanId);
  }
  if (timers.has(scanId)) {
    clearTimeout(timers.get(scanId));
    timers.delete(scanId);
  }
}

module.exports = { set, get, remove };
