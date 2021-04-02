const discord = require('discord.js');
const {token} = require('./config.json');
const fs = require('fs');
// suck my dickos
const bot = new discord.Client()
bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command);
}

const evtFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of evtFiles) {
    const evtName = file.split(".")[0];
    const event = require(`./events/${file}`)
    bot.on(evtName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)]
}

bot.login(token)
