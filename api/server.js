// Local Express dev server
// Mounts the API routes for local development.
// Not used in Vercel deployment (Vercel reads /api/*.js directly).

const express = require('express');
const cors = require('cors');
const { scanHandler, upload } = require('./scan');
const { actionHandler } = require('./action');
const { getDestinations, getOwnershipOptions } = require('./lib/moduleConfig');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/config', (req, res) => {
  res.json({ destinations: getDestinations(), ownership: getOwnershipOptions() });
});

// API routes
app.post('/api/scan', upload, scanHandler);
app.post('/api/action', actionHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum 10MB.' });
  }

  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[PRISM API] Server running on http://localhost:${PORT}`);
  console.log(`[PRISM API] Endpoints:`);
  console.log(`  POST /api/scan   — Upload content for analysis`);
  console.log(`  POST /api/action — Apply protection or continue`);
  console.log(`  GET  /api/health — Health check`);
  console.log(`  GET  /api/config — Product configuration`);
});

module.exports = app;
