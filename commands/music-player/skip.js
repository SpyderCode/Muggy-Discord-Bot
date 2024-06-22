const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('The number of songs to skip')
            .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        const amount = interaction.options.getInteger('amount', 1);
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) {
            return await interaction.followUp('❌ | No music is being played!');
        }
        const currentTrack = queue.nowPlaying;
        const success = queue.skip(amount);
        return await interaction.followUp(!success ? `❌ | Failed to skip ${amount} tracks!` : `⏭️ | Skipped ${amount} tracks! Now playing: **${currentTrack.name}**!`);

    }
}