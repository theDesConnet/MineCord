const Event = require('../structure/event.js');

module.exports = new Event('messageCreate', async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.isThread) {
        const bot = client.MineBots.find(bot => bot.thread.id == message.channel.id);
        if (!bot) return;

        if(message.channel.id === bot.thread.id && message.author.id === bot.ownerID) {
            bot.client.chat(message.content);
        }
    }
});