const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { loadMessages } = require('../events/utils/loadMessages');
const messages = loadMessages();
const { loadColors } = require('../events/utils/loadColors');
const colorsConfig = loadColors();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const pingEmbed = new EmbedBuilder()
            .setColor(colorsConfig.success)  // now correctly returns "#28a745"
            .setTitle(messages.ping.title)
            .setDescription(messages.ping.message);
        await interaction.reply({ embeds: [pingEmbed] });
    },
};