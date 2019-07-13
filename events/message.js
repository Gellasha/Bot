const discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const cooldowns = new discord.Collection();

module.exports = async (bot, message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
const args = message.content.slice(config.prefix.length).split(/ +/);
const commandName = args.shift().toLowerCase();
const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
if (!command) return;

if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs! Please go to a channel to use this command.');
}

if (command.args && !args.length) {
       if (command.usage) {
        message.channel.send(`\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``)
            .then (msg => {
            msg.delete(10000);
            });
        }
    }
    if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`You can't use \`${config.prefix}${command.name}\` for another ${timeLeft.toFixed(0)} seconds.`);
		}
	}

	timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
try {
    command.execute(message, args);
}
catch(error){
    console.error(error)
}


}