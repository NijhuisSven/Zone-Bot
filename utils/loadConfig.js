const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function loadConfig() {
    const configPath = path.join(__dirname, '..', 'configs', 'config.yml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return yaml.load(fileContents);
}

module.exports = { loadConfig };