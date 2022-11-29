const Button = require('../../structure/button.js');
const Discord = require('discord.js');

module.exports = new Button({
    buttonID: "disconnectBot",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        bot.client.removeListener('chat', () => {});
        bot.client.removeListener('message', () => {});

        bot.thread.setLocked(true, 'Connection closed...');
        bot.thread.setArchived(true, 'Connection closed...');

        bot.client.quit();

        client.MineBots.delete(bot.message.id, bot);

        interaction.deferUpdate();
    }
});