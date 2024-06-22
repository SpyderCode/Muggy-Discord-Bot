const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the current song'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) {
            return await interaction.followUp('❌ | No music is being played!');
        }
        queue.stop();
        return await interaction.followUp('⏹ | Stopped the player!');
    }
}