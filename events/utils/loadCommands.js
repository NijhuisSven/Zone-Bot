const fs = require('node:fs');
const path = require('node:path');
const colors = require('./colors');

function loadCommands(client) {
    const commandsPath = path.join(__dirname, '..', '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Ensure the command exports both a data and execute property
        if ('data' in command && 'execute' in command) {
            // Add to the client's collection using set
            client.commands.set(command.data.name, command);
            console.log(colors.loadc + `Loaded command: ${command.data.name} from ${filePath}`);
        } else {
            console.warn(colors.warnc + `The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

module.exports = { loadCommands };