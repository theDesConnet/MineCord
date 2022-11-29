const Discord = require('discord.js');
const Client = require('./client.js');

/**
 * 
 * @param {Client} client 
 * @param {Discord.SelectMenuInteraction} interaction
 */
function ExecuteFuctions(client, interaction) { }

//Класс select меню
class selectMenu {
    /**
     * @typedef {{selectMenuID: string, onlyBotOwner: Boolean, execute: ExecuteFuctions}} selectMenuOptions
     * @param {selectMenuOptions} options
     */
    constructor(options) {
        this.selectMenuID = options.selectMenuID;
        this.onlyBotOwner = options.onlyBotOwner;
        this.execute = options.execute;
    }
}

module.exports = selectMenu;