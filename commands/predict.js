const { SlashCommandBuilder } = require('@discordjs/builders');

const url = process.env.BASE_URL + '/model/predict';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('predict')
        .setDescription('Coming soon')
        .addSubcommand(bestwine =>
            bestwine
                .setName('bestwine')
                .setDescription('Predict the best wine base on model.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('parameters')
                .setDescription('Predict the wine quality based on the given parameters.')
                .addNumberOption(option => option.setName("fixed_acidity").setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('volatile_acidity').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('citric_acid').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('residual_sugar').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('chlorides').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('free_sulfur_dioxide').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('total_sulfur_dioxide').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('density').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('ph').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('sulphates').setDescription("Enter a number").setRequired(true))
                .addNumberOption(option => option.setName('alcohol').setDescription("Enter a number").setRequired(true))
        ),
    execute(interaction) {

        const subcommand = interaction.options.getSubcommand();
        if (!subcommand) {
            interaction.reply({ content: 'Please specify a subcommand.', ephemeral: true });
            return;
        }

        if(subcommand === 'bestwine') {
            fetch(url, {
                method: 'GET'
            })
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
            return;
        } else if (subcommand !== 'parameters') {
            interaction.reply({ content: 'Please specify a valid subcommand.', ephemeral: true });
            return;
        }

        const parameters = new Map();
        parameters.set('fixed_acidity', interaction.options.getNumber('fixed_acidity'));
        parameters.set('volatile_acidity', interaction.options.getNumber('volatile_acidity'));
        parameters.set('citric_acid', interaction.options.getNumber('citric_acid'));
        parameters.set('residual_sugar', interaction.options.getNumber('residual_sugar'));
        parameters.set('chlorides', interaction.options.getNumber('chlorides'));
        parameters.set('free_sulfur_dioxide', interaction.options.getNumber('free_sulfur_dioxide'));
        parameters.set('total_sulfur_dioxide', interaction.options.getNumber('total_sulfur_dioxide'));
        parameters.set('density', interaction.options.getNumber('density'));
        parameters.set('ph', interaction.options.getNumber('ph'));
        parameters.set('sulphates', interaction.options.getNumber('sulphates'));
        parameters.set('alcohol', interaction.options.getNumber('alcohol'));

        console.log(JSON.stringify(Object.fromEntries(parameters)));

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(parameters)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.status)
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