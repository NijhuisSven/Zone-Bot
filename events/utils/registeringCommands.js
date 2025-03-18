const colors = require('./colors');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        try {
            const commands = client.commands.map(command => command.data.toJSON());

            await client.application.commands.set(commands);
            console.log(colors.load + 'All commands registered:', commands.map(cmd => cmd.name).join(', '));
        } catch (error) {
            console.error(colors.error + 'Error registering commands:', error);
        }
    },
};