const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test if the bot is working correctly.'),
    async execute(interaction) {
        await interaction.reply({ content: `Pong !`, ephemeral: true });
    }
};