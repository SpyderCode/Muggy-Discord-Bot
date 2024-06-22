const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        //Normal reply
        //await interaction.reply('Pong!');

        //ephemeral: true means the response is only visible to the user who used the command
        //await interaction.reply({ content: 'Pong!', ephemeral: true});

        //editReply example
        /* await interaction.reply('Pong!');
        await wait(2_000);
        await interaction.editReply('Pong! (2 seconds later)'); */

        //deferReply example
/*         await interaction.deferReply({ ephemeral: true});
        await wait(4_000);
        await interaction.editReply('Pong! (4 seconds later)'); */

        //Follow-up example
/*         await interaction.reply('Pong!');
        await interaction.followUp('Pong! (Follow-up)'); */

        //Delete reply example
        /* await interaction.reply('Pong!');
        await interaction.deleteReply(); */

        //Ping example
        /* await interaction.reply('Pong!').then(() => {
            const ping = interaction.client.ws.ping;
            interaction.editReply(`Pong! (${ping}ms)`);
        }); */

        //Fetch reply example
/*         await interaction.reply('Pong!');
        const message = await interaction.fetchReply();
        console.log(message); */

        const locales = {
                'en-US': 'Pong!',
                'es-419': 'Alv joven! Awantese tantito',
                fr: 'Le Pong !',
        };
        console.log(interaction.locale);
        interaction.reply(locales[interaction.locale] ?? 'Pong! default');

    },
};