/** @format */

const Command = require('../structure/command.js');
const Discord = require('discord.js');

module.exports = new Command({
    name: "about",
    description: "About bot",
    permissions: "SEND_MESSAGES",
    onlyBotOwner: false,
    slashCommandOptions: [],
    async execute(client, args, interaction, crashers){
        let embed = new Discord.EmbedBuilder().setThumbnail(client.user.displayAvatarURL(dynamic = true)).setTitle("О боте").setDescription("Бот который может заходить на майнкрафт сервера\n\n**c0d9d by DesConnet**").setFooter({text: "Версия: 0.1 alpha"})
        interaction.reply({ embeds: [embed] });
    }
})
