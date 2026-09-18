const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'data', 'app_config.json');

function readConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function getDestinations() {
  return readConfig().destinations;
}

function getOwnershipOptions() {
  return readConfig().ownership;
}

function getFlagLabel(type) {
  return readConfig().flagLabels[type] || `${type} detected`;
}

/**
 * Normalize destination string (accept hyphens or underscores)
 * and return the list of modules to run.
 */
function getModulesForDestination(destination) {
  const normalized = destination.replace(/-/g, '_');
  const destinationConfig = getDestinations().find(item => item.value === normalized);
  return destinationConfig?.modules || ['PROTECT'];
}

module.exports = { getDestinations, getOwnershipOptions, getFlagLabel, getModulesForDestination };
