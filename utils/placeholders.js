function replacePlaceholders(message, interaction) {
    if (!interaction?.user) return message;
    return message
        .replace('${interaction.user.username}', interaction.user.username)
        .replace('${interaction.user.id}', interaction.user.id)
        .replace('${interaction.user.tag}', interaction.user.tag)
        .replace('${interaction.guild.name}', interaction.guild.name)
        .replace('${interaction.guild.id}', interaction.guild.id)
        .replace('${interaction.channel.name}', interaction.channel.name)
        .replace('${interaction.channel.id}', interaction.channel.id)
        .replace('${ping}', Math.round(interaction.client.ws.ping))
        .replace('${user}', interaction.options.getUser('user'))
        .replace('${reason}', interaction.options.getString('reason'));
}

module.exports = { replacePlaceholders };
