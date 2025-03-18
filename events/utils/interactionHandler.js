const { loadMessages } = require('./loadMessages');
const messages = loadMessages();
const { loadColors } = require('./loadColors');
const { EmbedBuilder } = require('discord.js');
const colorsConfig = loadColors();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing command (${interaction.commandName}):`, error);
            if (!interaction.replied && !interaction.deferred) {
                const ErrorEmbed = new EmbedBuilder()
                    .setColor(colorsConfig.error)
                    .setTitle(messages.interactionError.title)
                    .setDescription(messages.interactionError.message);
                await interaction.reply({ embeds: [ErrorEmbed], ephemeral: true });
            }
        }
    },
};