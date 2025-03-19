const { EmbedBuilder } = require('discord.js');
const { loadConfig } = require('../utils/loadConfig');
const config = loadConfig();
const { loadMessages } = require('../utils/loadMessages');
const messages = loadMessages();
const { loadColors } = require('../utils/loadColors');
const colorsConfig = loadColors();
const { replacePlaceholders } = require('../utils/placeholders');

async function sendModerationLog(interaction, targetUser, reason, action, other) {
    const logChannel = interaction.guild.channels.cache.get(config.auditLogsChannel);
    if (!logChannel) {
        console.warn(`No log channel found for ID: ${config.auditLogsChannel}`);
        return;
    }
    
    // If other is not provided or not a string, default to "Not provided"
    const finalOther = typeof other === 'string' && other.trim().length > 0 ? other : "Not provided";
    
    // Replace ${action} and ${other} before calling replacePlaceholders
    const rawTitle = messages.moderationLogs.title
        .replace('${action}', action)
        .replace('${other}', finalOther);
    const rawMessage = messages.moderationLogs.message
        .replace('${action}', action)
        .replace('${other}', finalOther);

    // Let replacePlaceholders handle everything else
    const title = replacePlaceholders(rawTitle, interaction);
    const message = replacePlaceholders(rawMessage, interaction);

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(colorsConfig.error || 'Red')
        .setDescription(message)
        .setTimestamp();

    console.log(`Sending moderation log to ${logChannel.name}...`);
    await logChannel.send({ embeds: [embed] });
}

module.exports = { sendModerationLog };
