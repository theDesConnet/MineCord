const Event = require('../structure/event.js');
const { InteractionType, ComponentType } = require('discord.js');

module.exports = new Event('interactionCreate', async (client, interaction) => {
    if (interaction.user.bot) return;

    switch (interaction.type) {
        case InteractionType.ApplicationCommand: //Обработчик Slash команд
            const command = client.commands.find(cmd => cmd.name == interaction.commandName);
            const args = interaction.options;
    
            if (!command) return;
            if (command.onlyBotOwner) {
                const bot = client.MineBots.find(x => x.ownerID == interaction.user.id);
                if (!bot) return interaction.reply("У вас нет запущенного бота");
            }
    
            command.execute(client, args, interaction);
            break;

        case InteractionType.MessageComponent: //Обработчик Компонентов в сообщении
            if (interaction.componentType === ComponentType.Button) { //Обработчик Кнопок 
                const button = client.buttons.get(interaction.customId);

                if (!button) return;
                if (button.onlyBotOwner) {
                    const bot = client.MineBots.find(x => x.message.id == interaction.message.id);
                    if (!bot) return interaction.reply({content: "Данный бот уже не работает", ephemeral: true});
                    if (bot.ownerID != interaction.user.id) return interaction.reply({content: "Это не ваш бот", ephemeral: true});
                }
        
                button.execute(client, interaction);
            }

            if (interaction.componentType === ComponentType.StringSelect) { //Обработчик selectMenu
                const selectMenu = client.selectMenus.get(interaction.customId);

                if (!selectMenu) return;
                if (selectMenu.onlyBotOwner) {
                    const bot = client.MineBots.find(x => x.message.id == interaction.message.id);
                    if (!bot) return interaction.reply({content: "Данный бот уже не работает", ephemeral: true});
                    if (bot.ownerID != interaction.user.id) return interaction.reply({content: "Это не ваш бот", ephemeral: true});
                }
        
                selectMenu.execute(client, interaction);
            }
            break;

        case InteractionType.ModalSubmit: //Обработчик Модальных окон
            const Modal = client.modals.get(interaction.customId);

            if (!Modal) return;
            if (Modal.onlyBotOwner) {
                const bot = client.MineBots.find(x => x.message.id == interaction.message.id);
                if (!bot) return interaction.reply({content: "Данный бот уже не работает", ephemeral: true});
                if (bot.ownerID != interaction.user.id) return interaction.reply({content: "Это не ваш бот", ephemeral: true});
            }
    
            Modal.execute(client, interaction);
            break;
    }

    /* Устарело (Или же для d.js v13)
    if (interaction.isCommand()) { //Обработчик Slash команд 

    }
    
    if (interaction.isButton()) { //Обработчик Кнопок 

    }

    if (interaction.isSelectMenu()) { //Обработчик selectMenu

    }

    if (interaction.isModalSubmit()) {

    }*/
});