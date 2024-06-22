const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the player'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return await interaction.reply({ content: '❌ | No music is being played!' });

        const success = queue.setPaused(false);
        return await interaction.reply({ content: !success ? '▶ | Resumed!' : '❌ | Something went wrong!' });
    }
}