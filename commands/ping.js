const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test if the bot is working correctly.'),
    execute(interaction) {
        // await interaction.deferReply({ ephemeral: true });
        interaction.reply({ content: `Pong ! ${Math.abs(Date.now() - interaction.createdTimestamp)}ms`, ephemeral: true });
    }
};