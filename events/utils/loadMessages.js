const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const colors = require('./colors');
function loadMessages() {
    const filePath = path.join(__dirname, '..', '..', 'configs', 'messages.yml');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const messages = yaml.load(fileContents);
        return messages;
    } catch (error) {
        console.error(colors.errorc + 'Error loading messages:', error);
        return {};
    }
}

module.exports = { loadMessages };