const selectMenu = require('../../structure/selectMenu.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals


module.exports = new selectMenu({
    selectMenuID: "gotoPlayers",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const firstActionRow = new Discord.ActionRowBuilder()
            .addComponents([
                components.buttons.movementMenuButton,
                components.buttons.interactionPlayerButton,
                components.buttons.otherMenuButton]);

        const actionRow = new Discord.ActionRowBuilder()
            .addComponents([components.buttons.disconnectButton]);

        const mcData = require('minecraft-data')(bot.client.version);

        const defaultMove = new Movements(bot.client, mcData);

        const target = bot.client.players[interaction.values[0]] ? bot.client.players[interaction.values[0]].entity : null;

        if (!target) {
            return interaction.update({ content: 'Цель не была найдена...', components: [firstActionRow, actionRow] });
        }
        const p = target.position

        bot.client.pathfinder.setMovements(defaultMove)
        bot.client.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, -1))

        interaction.update({components: [firstActionRow, actionRow] });
    }
});