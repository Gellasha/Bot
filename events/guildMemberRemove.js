const config = require ("../config.json");

module.exports = async(bot, member) => {
    bot.channels.get(config.leaveChannelID).send(config.leaveMsg)
}