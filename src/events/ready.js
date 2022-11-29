const Event = require('../structure/event.js');
const { ActivityType } = require('discord.js');


module.exports = new Event('ready', client => {
    console.clear()
    console.log('MineCord v0.1 Alpha\nc0d9d by DesConnet');
    client.user.setPresence({ activities: [{ name: `Creating Minecraft Bots | MineCord`, type: ActivityType.Competing }]})
})