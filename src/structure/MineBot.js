const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder
const pvp = require('mineflayer-pvp').plugin
const components = require('../functions/menuComponents.js');
const config = require('../jsons/config.json');

class MineBot {
    /**
     * @typedef {{username: String, host: String, port: Number, botArray: Discord.Collection<string, MineBot>, interaction: Discord.CommandInteraction, message: Discord.Message, ownerID: String, thread: Discord.ThreadChannel}} MCOptions
     * @param {MCOptions} options 
     */
    constructor(options) {
        this.username = options.username,
            this.host = options.host,
            this.port = options.port,
            this.botArray = options.botArray,
            this.interaction = options.interaction,
            this.message = options.message,
            this.ownerID = options.ownerID,
            this.thread = options.thread

        this.runBot();
    }

    runBot() {
        this.client = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: this.port
        });

        const port = this.port || 'Не указан';
        let msgarr = [];
        let count = 0;

        this.client.once('login', () => {
            const embed = new Discord.EmbedBuilder()
                .setColor('Green')
                .setAuthor({
                    name: `Бот: ${this.username} | Владелец: ${this.interaction.user.tag}`,
                    iconURL: this.interaction.user.avatarURL({ dynamic: true })
                })
                .addFields([{
                    name: 'Хост',
                    value: `${this.host}`,
                    inline: true
                }, {
                    name: 'Порт',
                    value: `${port}`,
                    inline: true
                }])
                .setFooter({
                    text: `${this.interaction.guild.name} | MineCord [Alpha]`,
                    iconURL: this.interaction.user.displayAvatarURL({ dynamic: true })
                });

            const firstActionRow = new Discord.ActionRowBuilder()
                .addComponents([
                    components.buttons.movementMenuButton,
                    components.buttons.interactionPlayerButton,
                    components.buttons.otherMenuButton]);

            const actionRow = new Discord.ActionRowBuilder()
                .addComponents([components.buttons.disconnectButton]);

            this.interaction.editReply({ embeds: [embed], components: [firstActionRow, actionRow] });
            this.message.startThread({
                name: `Логи сервера | MineCord [${this.username}]`,
                autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneWeek,
                reason: 'Здесь будут отображатся логи сервера.'
            }).then(async (threadChannel) => {
                this.thread = threadChannel;
            })
        })

        this.client.on('chat', async (username, message) => {
            if (username == this.username) return;
            try {
                if (message != "")  this.thread.send({ content: `**${username}**: ${message}` });s
            } catch { }
        });

        this.client.on('messagestr', (message, position, jsonmsg) => {
            if (position != "chat") {
                if (count < config.countMsg) {
                    if (message != "") {
                        msgarr.push(message);
                        count++;
                    }
                } else {
                    let strmsg = msgarr.join("\n").toString();
                    try {
                        this.thread.send(`${strmsg}`);
                    } catch { }
                    msgarr = [];
                    count = 0;
                }
            }
        })

        this.client.once('end', async (reason) => {
            if (this.thread != null) {
                this.thread.setLocked(true, 'Connection closed...');
                this.thread.setArchived(true, 'Connection closed...');
            }
            this.botArray.delete(this.message.id, this);

            const embed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setAuthor({
                    name: `Бот: ${this.username} | Завершил свою работу`,
                    iconURL: this.interaction.user.avatarURL({ dynamic: true })
                })
                .addFields([{
                    name: 'Хост',
                    value: `${this.host}`,
                    inline: true
                }, {
                    name: 'Порт',
                    value: `${port}`,
                    inline: true
                }, {
                    name: 'Причина',
                    value: `\`\`\`${reason}\`\`\``,
                    inline: false
                }])
                .setFooter({
                    text: `${this.interaction.guild.name} | MineCord [Alpha]`,
                    iconURL: this.interaction.user.displayAvatarURL({ dynamic: true })
                });

            this.interaction.editReply({ embeds: [embed], components: [] });
        })

        this.client.loadPlugins([pathfinder, pvp]);
    }
}

module.exports = MineBot;