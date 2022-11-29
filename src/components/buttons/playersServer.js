const Button = require('../../structure/button.js');
const Discord = require('discord.js');

module.exports = new Button({
    buttonID: "playersServer",
    onlyBotOwner: true,
    async execute(client, interaction) {
        const bot = client.MineBots.find(bot => bot.message.id == interaction.message.id);
        if (!bot) return;

        const playersList = Object.keys(bot.client.players).join('\n')

        const embed = new Discord.EmbedBuilder()
            .setColor('Orange')
            .setAuthor({
                name: `Список игроков | Бот: ${bot.username}`,
            })
            .setDescription(`${playersList}`)
            .setFooter({
                text: `${interaction.guild.name} | MineCord [Alpha]`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        interaction.reply({embeds: [embed], ephemeral: true});
    }
});