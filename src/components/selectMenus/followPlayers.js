const selectMenu = require('../../structure/selectMenu.js');
const Discord = require('discord.js');
const components = require('../../functions/menuComponents.js');
const Movements = require('mineflayer-pathfinder').Movements
const { GoalFollow } = require('mineflayer-pathfinder').goals


module.exports = new selectMenu({
    selectMenuID: "followPlayers",
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

        const mcData = require('minecraft-data')(bot.client.version);

        const defaultMove = new Movements(bot.client, mcData);

        const target = bot.client.players[interaction.values[0]] ? bot.client.players[interaction.values[0]].entity : null;

        if (!target) {
            return interaction.update({ content: 'Цель не была найдена...', components: [firstActionRow, actionRow] });
        }

        actionRow.addComponents([components.buttons.disableFollowButton]);

        bot.client.pathfinder.setMovements(defaultMove)
        bot.client.pathfinder.setGoal(new GoalFollow(target, -1))

        interaction.update({components: [firstActionRow, actionRow] });
    }
});