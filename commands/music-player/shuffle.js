const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return await interaction.reply({ content: '❌ | No music is being played!' });

        queue.shuffle();
        return await interaction.reply('🔀 | Shuffled the queue!');
    }
}