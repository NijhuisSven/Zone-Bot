const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const defaultColors = require('../events/utils/colors');
function loadColors() {
    const filePath = path.join(__dirname, '..', 'configs', 'colors.yml');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const loaded = yaml.load(fileContents);
        return loaded.colors || {};
    } catch (error) {
        console.error(defaultColors.errorc + 'Error loading colors:', error);
        return {};
    }
}

module.exports = { loadColors };