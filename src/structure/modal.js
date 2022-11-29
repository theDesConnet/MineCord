const Discord = require('discord.js');
const Client = require('./client.js');

/**
 * 
 * @param {Client} client 
 * @param {Discord.ModalSubmitInteraction} interaction
 */
function ExecuteFuctions(client, interaction) { }

//Класс кнопки
class Modal {
    /**
     * @typedef {{modalID: string, onlyBotOwner: Boolean, execute: ExecuteFuctions}} ModalOptions
     * @param {ModalOptions} options
     */
    constructor(options) {
        this.modalID = options.modalID;
        this.onlyBotOwner = options.onlyBotOwner;
        this.execute = options.execute;
    }
}

module.exports = Modal;