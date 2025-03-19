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
        .setName('timeout')
        .setDescription('Timeouts a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('The time in minutes').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout').setRequired(true)),
    async execute(interaction) {
        const title = replacePlaceholders(messages.timeout.title, interaction);
        const message = replacePlaceholders(messages.timeout.message, interaction);
        const userTitle = replacePlaceholders(messages.timeoutUser.title, interaction);
        const userMessage = replacePlaceholders(messages.timeoutUser.message, interaction);

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getInteger('time') * 60000;
        
        const timeoutEmbed = new EmbedBuilder()
            .setColor(colorsConfig.success)
            .setTitle(title)
            .setDescription(message);
        const userTimeoutEmbed = new EmbedBuilder()
            .setColor(colorsConfig.primary)
            .setTitle(userTitle)
            .setDescription(userMessage)
            .setTimestamp();

            try{
                user.send({ embeds: [userTimeoutEmbed] })
                .then(() => {
                    user.timeout(time)
                })
            } catch (error) {
                interaction.followup({ content: 'The message could not be sent to this user.', ephemeral: true });
            }
        await interaction.reply({ embeds: [timeoutEmbed] });
        sendModerationLog(interaction, user, reason, 'TimeOut', `${time / 60000} minutes`);
    },
};