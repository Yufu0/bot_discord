const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const utils = require("./utils");

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
    let command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        utils.log_to_console(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        utils.log_to_console(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        utils.error_to_console(error.toString());
    }
})();

