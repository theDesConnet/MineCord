/** @format */

const Command = require('../structure/command.js');
const MineBot = require('../structure/MineBot.js');
const Discord = require('discord.js');

module.exports = new Command({
    name: "runbot",
    description: "Start a new Bot",
    permissions: "SEND_MESSAGES",
    onlyBotOwner: false,
    slashCommandOptions: [{
        name: "username",
        type: Discord.ApplicationCommandOptionType.String,
        description: 'Enter username bot',
        required: true
    }, {
        name: "host",
        type: Discord.ApplicationCommandOptionType.String,
        description: 'Enter host to join',
        required: true
    }, {
        name: "port",
        type: Discord.ApplicationCommandOptionType.Number,
        description: 'Enter port server',
        required: false
    }],
    async execute(client, args, interaction) {
        interaction.deferReply({ fetchReply: true }).then(async (msg) => {
            const bot = new MineBot({ 
                username: args.getString('username'), 
                host: args.getString('host'), port: args.getNumber('port'), 
                botArray: client.MineBots, 
                interaction: interaction, 
                message: msg, 
                ownerID: interaction.user.id, 
                thread: null});

            client.MineBots.set(msg.id, bot);
        })
    }
})