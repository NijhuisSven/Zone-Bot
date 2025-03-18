const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./token.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const { loadCommands } = require('./events/utils/loadCommands');
const { loadEvents } = require('./events/utils/loadEvents');
const { registerLogging } = require('./events/utils/logger');

loadEvents(client);
loadCommands(client);
registerLogging(client);

client.login(token);