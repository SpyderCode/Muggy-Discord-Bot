const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lista')
        .setDescription('Show the current queue'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return interaction.reply({ content: '❌ | No music is being played!' });

        const current = queue.nowPlaying;
        const tracks = queue.songs.slice(0, 5).map((m, i) => {
            return `${i === 0 ? '🔵' : '⚪'} | **${i + 1}**. [${m.name}](${m.url})`;
        });

        return await interaction.reply({
            embeds: [{
                title: 'Queue',
                description: `${tracks.join('\n')}${queue.songs.length > 5 ? `\n...and **${queue.songs.length - 5}** more tracks` : ''}`,
                color: 0x5865F2,
                fields: [
                    { name: 'Now Playing', value: `🔵 | [${current.name}](${current.url})` }
                ]
            }]
        });
    }
}