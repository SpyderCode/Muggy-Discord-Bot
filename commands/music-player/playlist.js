const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Add a playlist to the queue')
        .addStringOption(option => 
            option.setName('playlist')
                .setDescription('The playlist to play')
                .setRequired(true)),
    async execute(interaction) {
               
        const playlistInput = interaction.options.getString('playlist');

        await interaction.deferReply();
        let channel = interaction.member.voice.channel;
        if(!channel) 
            return await interaction.followUp('You need to join a voice channel first!');

        let guildQueue = interaction.client.player.hasQueue(interaction.guild.id);
        let queue;

        if(!guildQueue){
            queue = interaction.client.player.createQueue(interaction.guild.id);
        } else {
            queue = interaction.client.player.getQueue(interaction.guild.id);
        }

        let channelName = interaction.member.voice.channel;

        await queue.join(channelName).catch(err => {
            console.error(err);
            return interaction.followUp('There was an error joining the voice channel!');
        });

        let playlist = await queue
        .playlist(playlistInput, {requestedBy: interaction.user})
        .catch(err => {
            console.error(err);
            return interaction.followUp('There was an error getting the playlist!');
        });
        console.log(`Added playlist songs to queue: ${playlist.name}`);
        if(queue.isPlaying){
            return await interaction.followUp(`Added playlist songs to queue: ${playlist.name}`);
        }else {
            return await interaction.followUp(`Now playing: ${playlist.name}`);
        }



    }
}