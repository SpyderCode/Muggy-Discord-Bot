const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a song from the queue')
        .addIntegerOption(option =>
            option.setName('index')
                .setDescription('The index of the song to remove')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const index = interaction.options.getInteger('index');
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) {
            return await interaction.followUp('❌ | No music is being played!');
        }
        if (index < 1 || index > queue.songs.length) {
            return await interaction.followUp(`❌ | Invalid track index. Please provide a number between 1 and ${queue.songs.length}.`);
        }
        const song = queue.songs[index - 1];
        queue.remove(index - 1);
        return await interaction.followUp(`✅ | Removed: **${song.name}** from the queue!`);
    }   
}