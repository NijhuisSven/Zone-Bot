const fs = require('node:fs');
const path = require('node:path');
const colors = require('./colors');

function loadEvents(client, directory = path.join(__dirname, '..', '..', 'events')) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            loadEvents(client, fullPath);
        } else if (file.endsWith('.js')) {
            const event = require(fullPath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(colors.load + `Loaded event: ${event.name} from ${fullPath}`);
        }
    }
}

module.exports = { loadEvents };