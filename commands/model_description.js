const { SlashCommandBuilder } = require('@discordjs/builders');
const url = process.env.BASE_URL + '/model/description';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('model_description')
        .setDescription('Return the description of the current model.'),
    execute(interaction) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                interaction.reply({ content: `${JSON.stringify(data)}`, ephemeral: true });
            })
            .catch(error => {
                interaction.reply({ content: `${JSON.stringify(error)}`, ephemeral: true })
            })
    }
};





