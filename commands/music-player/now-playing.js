const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('now-playing')
        .setDescription('Get the currently playing song'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return await interaction.reply({ content: '❌ | No music is being played!' });

        const currentTrack = queue.nowPlaying;
        return await interaction.reply(`🎶 | **${currentTrack.name}** is currently playing!`);
    }
}