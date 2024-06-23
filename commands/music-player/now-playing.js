const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('now-playing')
        .setDescription('Get the currently playing song'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return await interaction.reply({ content: '❌ | No music is being played!' });

        const currentTrack = queue.nowPlaying;
        const songEmbed = new EmbedBuilder()
            .setTitle('Now Playing')
            .setURL(currentTrack.url)
            .setDescription(`🎶 | **${currentTrack.name}**`)
            .setAuthor({ name: `Author: ${currentTrack.author}`})
            .setThumbnail(currentTrack.thumbnail)
            .setImage(currentTrack.thumbnail)
            .setColor(0x00FF00)
            .setFooter({text: `Requested by ${currentTrack.requestedBy}`})
            .setTimestamp();

        return await interaction.reply({ embeds: [songEmbed] });
    }
}