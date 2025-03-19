const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { loadMessages } = require('../../utils/loadMessages');
const messages = loadMessages();
const { loadColors } = require('../../utils/loadColors');
const colorsConfig = loadColors();
const { replacePlaceholders } = require('../../utils/placeholders');
const { sendModerationLog } = require('../../events/moderationLogs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Replies with Pong!')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick')),
    async execute(interaction) {
        const title = replacePlaceholders(messages.kick.title, interaction);
        const message = replacePlaceholders(messages.kick.message, interaction);
        const userTitle = replacePlaceholders(messages.kickUser.title, interaction);
        const userMessage = replacePlaceholders(messages.kickUser.message, interaction);

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        const kickEmbed = new EmbedBuilder()
            .setColor(colorsConfig.success)
            .setTitle(title)
            .setDescription(message);
        const userKickEmbed = new EmbedBuilder()
            .setColor(colorsConfig.primary)
            .setTitle(userTitle)
            .setDescription(userMessage)
            .setTimestamp();

        user.kick(reason)
            .then(
                user.send({ embeds: [userKickEmbed] }),
            )
        await interaction.reply({ embeds: [kickEmbed] });
        sendModerationLog(interaction, user, reason, 'Kick');
    },
};