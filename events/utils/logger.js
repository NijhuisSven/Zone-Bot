const colors = require('./colors');
function registerLogging(client) {
    client.on("debug", (e) => console.info(colors.debugc + e));
    client.on("warn", (e) => console.warn(colors.warnc + e));
    client.on("error", (e) => console.error(colors.errorc + e));
    client.on("ready", (e) => console.log(colors.loadc + `Logged in as ${client.user.tag}`));
}

module.exports = { registerLogging };