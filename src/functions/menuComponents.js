const Discord = require('discord.js');

module.exports = {
    buttons: {
        movementMenuButton: new Discord.ButtonBuilder()
            .setCustomId('movementMenu')
            .setLabel('Перемещение')
            .setStyle(Discord.ButtonStyle.Primary),

        otherMenuButton: new Discord.ButtonBuilder()
            .setCustomId('otherMenu')
            .setLabel('Остальное')
            .setStyle(Discord.ButtonStyle.Primary),

        interactionPlayerButton: new Discord.ButtonBuilder()
            .setCustomId('interactionPlayer')
            .setLabel('Взаимодействие с игроками')
            .setStyle(Discord.ButtonStyle.Primary),

        backMenuButton: new Discord.ButtonBuilder()
            .setCustomId('backMenu')
            .setLabel('Назад')
            .setStyle(Discord.ButtonStyle.Danger),

        gotoPlayerButton: new Discord.ButtonBuilder()
            .setCustomId('gotoPlayer')
            .setLabel('Прийти к игроку')
            .setStyle(Discord.ButtonStyle.Primary),

        followPlayerButton: new Discord.ButtonBuilder()
            .setCustomId('followPlayer')
            .setLabel('Следовать за игроком')
            .setStyle(Discord.ButtonStyle.Primary),

        attackPlayerButton: new Discord.ButtonBuilder()
            .setCustomId('attackPlayer')
            .setLabel('Атаковать игрока')
            .setStyle(Discord.ButtonStyle.Primary),

        playersButton: new Discord.ButtonBuilder()
            .setCustomId('playersServer')
            .setLabel('Список игроков')
            .setStyle(Discord.ButtonStyle.Primary),

        disablePVPButton: new Discord.ButtonBuilder()
            .setCustomId('disablePVP')
            .setLabel('Прекратить PVP')
            .setStyle(Discord.ButtonStyle.Danger),

        disconnectButton: new Discord.ButtonBuilder()
            .setCustomId('disconnectBot')
            .setLabel('Отключится')
            .setStyle(Discord.ButtonStyle.Danger),

        disableFollowButton: new Discord.ButtonBuilder()
            .setCustomId('disableFollow')
            .setLabel('Прекратить следовать')
            .setStyle(Discord.ButtonStyle.Danger)
    }
}