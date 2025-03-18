const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const defaultColors = require('./colors'); // (optional) fallback colors if needed

function loadColors() {
    const filePath = path.join(__dirname, '..', '..', 'configs', 'colors.yml');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const loaded = yaml.load(fileContents);
        // Return the "colors" property instead of the entire object
        return loaded.colors || {};
    } catch (error) {
        console.error(defaultColors.errorc + 'Error loading colors:', error);
        return {};
    }
}

module.exports = { loadColors };