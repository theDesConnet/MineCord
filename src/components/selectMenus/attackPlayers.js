const selectMenu = require('../../structure/selectMenu.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');


module.exports = new selectMenu({
    selectMenuID: "attackPlayers",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const firstActionRow = new Discord.ActionRowBuilder()
            .addComponents([
                components.buttons.movementMenuButton,
                components.buttons.interactionPlayerButton,
                components.buttons.otherMenuButton]);

        let actionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.disconnectButton]);

        const target = bot.client.players[interaction.values[0]] ? bot.client.players[interaction.values[0]].entity : null;

        if (!target) {     
            return interaction.update({ components: [firstActionRow, actionRow] });
        }

        actionRow.addComponents([components.buttons.disablePVPButton]);

        bot.client.pvp.attack(target);

        interaction.update({components: [firstActionRow, actionRow] });
    }
});