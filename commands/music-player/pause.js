const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return interaction.reply({ content: '❌ | No music is being played!' });

        const success = queue.setPaused(true);
        return interaction.reply({ content: success ? '⏸ | Paused!' : '❌ | Something went wrong!' });
    }
}