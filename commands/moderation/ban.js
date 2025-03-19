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
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(true)),
    async execute(interaction) {
        const title = replacePlaceholders(messages.ban.title, interaction);
        const message = replacePlaceholders(messages.ban.message, interaction);
        const userTitle = replacePlaceholders(messages.banUser.title, interaction);
        const userMessage = replacePlaceholders(messages.banUser.message, interaction);

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        
        const banEmbed = new EmbedBuilder()
            .setColor(colorsConfig.success)
            .setTitle(title)
            .setDescription(message);
        const userBanEmbed = new EmbedBuilder()
            .setColor(colorsConfig.primary)
            .setTitle(userTitle)
            .setDescription(userMessage)
            .setTimestamp();

            user.send({ embeds: [userBanEmbed] })
                .then(() => {
                    interaction.guild.members.ban(user, { reason: reason });
                })
        await interaction.reply({ embeds: [banEmbed] });
        sendModerationLog(interaction, user, reason, 'Ban');
    },
};