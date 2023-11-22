const { SlashCommandBuilder } = require('@discordjs/builders');
const {Permissions} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test if the bot is working correctly.'),
    async execute(interaction) {
        if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            await interaction.reply({ content: `Pong !`, ephemeral: true });
        }
    },
};