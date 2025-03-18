module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        
        if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`Command not found: ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing command (${interaction.commandName}):`, error);
            // If the interaction has not been replied to or deferred, send a reply.
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
            }
        }
    },
};