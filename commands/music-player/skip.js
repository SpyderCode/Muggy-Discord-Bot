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
        const amount = interaction.options.getInteger('amount') ?? 1;

        const queue = interaction.client.player.getQueue(interaction.guildId);

        if (amount >= queue.songs.length) {
            return await interaction.followUp(`❌ | You can't skip ${amount} songs, there are only ${queue.songs.length} songs in the queue!`);
        }
        
        
        if (!queue || !queue.isPlaying) {
            return await interaction.followUp('❌ | No music is being played!');
        }
        const nextSong = queue.songs[amount];
        const success = await queue.skip(amount-1);
        return await interaction.followUp(!success ? `❌ | Failed to skip ${amount} tracks!` : `⏭️ | Skipped ${amount} tracks! Now playing: **${nextSong.name}**!`);

    }
}