const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Replies with a gif!')
        .addStringOption(option =>
            option.setName('gif')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoices(
                    { name: 'Funny', value: 'funny' },
                    { name: 'Cute', value: 'cute' },
                    { name: 'Scary', value: 'scary' },
                    { name: 'Random', value: 'random' }
                )),
    async execute(interaction) {
        const gif = interaction.options.getString('gif');
        const gifs = {
            'funny': 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHI5M3VubjZkd2p0anIzN3FmYms5MzBvbHFta2pjYmszeGdyOHNqNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cYZkY9HeKgofpQnOUl/giphy.webp',
            'cute': 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWVtOW8yaXlhbDkyY2g4a2s2c2Vramp4bHIzOGg4cjFzNWp1MHZ6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JXibbAa7ysN9K/giphy.webp',
            'scary': 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzd1M3Zrc2JvdGh3YmQ2c21icmM0cDlta2pqcG54dDY0YWk1eTlpbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LllA2dKt1qZuE/200w.webp',
            'random': 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV5OHBmczBnN3g4cXprbG80MzBkNTNmNnl3dTJ2cGY4ZnNjcnZvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3V0x6kdXUW9M4ONq/giphy.webp',
        };
        await interaction.reply({ content: gifs[gif] ?? gifs['funny'], ephemeral: true });
    }
}