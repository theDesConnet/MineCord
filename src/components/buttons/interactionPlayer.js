const Button = require('../../structure/button.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');

module.exports = new Button({
    buttonID: "interactionPlayer",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const firstActionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.attackPlayerButton]);

        const actionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.disconnectButton, components.buttons.backMenuButton]);

        interaction.update({components: [firstActionRow, actionRow] });
    }
});