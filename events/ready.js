const config = require ('../config.json')
module.exports = async(bot) => {
console.log(config.ready)
bot.user.setActivity(config.activity, { type: config.status})
}