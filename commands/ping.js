const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { loadMessages } = require('../utils/loadMessages');
const messages = loadMessages();
const { loadColors } = require('../utils/loadColors');
const colorsConfig = loadColors();
const { replacePlaceholders } = require('../utils/placeholders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const title = replacePlaceholders(messages.ping.title, interaction);
        const message = replacePlaceholders(messages.ping.message, interaction);
        
        const pingEmbed = new EmbedBuilder()
            .setColor(colorsConfig.success)
            .setTitle(title)
            .setDescription(message);
        await interaction.reply({ embeds: [pingEmbed] });
    },
};