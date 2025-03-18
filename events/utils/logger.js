const colors = require('./colors');
function registerLogging(client) {
    client.on("debug", (e) => console.info(colors.debug + e));
    client.on("warn", (e) => console.warn(colors.warn + e));
    client.on("error", (e) => console.error(colors.error + e));
    client.on("ready", (e) => console.log(colors.load + `Logged in as ${client.user.tag}`));
}

module.exports = { registerLogging };