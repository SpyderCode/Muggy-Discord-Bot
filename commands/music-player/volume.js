const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Change the volume of the player')
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('The volume to set')
                .setRequired(true)),
    async execute(interaction) {
        const volume = interaction.options.getInteger('volume');
        if (volume < 0 || volume > 100) return await interaction.reply({ content: '❌ | Volume must be between 0 and 100!' });

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.isPlaying) return await interaction.reply({ content: '❌ | No music is being played!' });

        queue.setVolume(volume);
        return interaction.reply(`🔊 | Volume set to **${volume}%**!`);
    }
}