const fs = require('node:fs');
const path = require('node:path');
const colors = require('./colors');

function loadCommands(client, dir = path.join(__dirname, '..', '..', 'commands')) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Recursively load commands from subfolders
            loadCommands(client, filePath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(
                    colors.loadc + `Loaded command: ${command.data.name} from ${filePath}`
                );
            } else {
                console.warn(
                    colors.warnc + `The command at ${filePath} is missing "data" or "execute" property.`
                );
            }
        }
    }
}

module.exports = { loadCommands };