const Button = require('../../structure/button.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');

module.exports = new Button({
    buttonID: "attackPlayer",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const actionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.disconnectButton]);

        let atcMenu = new Discord.SelectMenuBuilder()
            .setCustomId('attackPlayers')
            .setPlaceholder('Выбери игрока...');

        const players = Object.keys(bot.client.players);

        players.forEach((player) => {
            if (player != bot.username) {
                atcMenu.addOptions({
                    label: `${player}`,
                    value: `${player}`
                });
            }
        })

        const firstActionRow = new Discord.ActionRowBuilder()
            .addComponents([atcMenu]);

        interaction.update({components: [firstActionRow, actionRow]});
    }
});