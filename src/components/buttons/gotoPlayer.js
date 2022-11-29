const Button = require('../../structure/button.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');

module.exports = new Button({
    buttonID: "gotoPlayer",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const actionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.disconnectButton]);


        let gotoMenu = new Discord.SelectMenuBuilder()
            .setCustomId('gotoPlayers')
            .setPlaceholder('Выбери игрока...');

        const players = Object.keys(bot.client.players);

        players.forEach((player) => {
            if (player != bot.username) {
                gotoMenu.addOptions({
                    label: `${player}`,
                    value: `${player}`
                });
            }
        })

        const firstActionRow = new Discord.ActionRowBuilder()
            .addComponents([gotoMenu]);

        interaction.update({components: [firstActionRow, actionRow]});
    }
});