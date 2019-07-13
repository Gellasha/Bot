const discord = require('discord.js');
const config = require ('../config.json')
module.exports = async(bot, member) => {
bot.channels.get(config.welcomeChannelID).send(config.welcomeMsg)
}