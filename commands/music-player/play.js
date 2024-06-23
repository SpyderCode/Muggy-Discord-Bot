const { SlashCommandBuilder } = require('discord.js'); 



module.exports ={
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from youtube')
    .addStringOption(option =>
        option.setName('song')
            .setDescription('The song to play')
            .setRequired(true))
    .addBooleanOption(option =>
        option.setName('force')
            .setDescription('Directly play the song without adding it to the queue')
            .setRequired(false)),
    async execute(interaction){

        const inputedSong = interaction.options.getString('song');
        const force = interaction.options.getBoolean('force');

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
        let song;

        if(force){
            
            song = await queue
                .play(inputedSong, {index: 1, requestedBy: interaction.user.tag })
                .catch(err => {
                    console.error(err);
                    return interaction.reply('There was an error playing the song!');
                });
            if(!song){
                return interaction.followUp('No tracks found!');
            }
            queue.skip();
            await interaction.followUp(`Now playing: ${song.name}`);
        } else {
            song = await queue
                .play(inputedSong, {requestedBy: interaction.user.tag })
                .catch(err => {
                    console.error(err);
                    return interaction.reply('There was an error playing the song!');
                });
                if(!song){
                    return interaction.followUp('No tracks found!');
                }
            await interaction.followUp(`Added to queue: ${song.name}`);
        }

        


        /* const inputedSong = interaction.options.getString('song');
        await interaction.deferReply();

        const guildQueue = interaction.client.player.getQueue(interaction.guild.id);

        let queue = interaction.client.player.createQueue(interaction.guild.id);
        await queue.join(interaction.member.voice.channel);

        let song = await queue.play(inputedSong).catch(err => {
            console.error(err);
            
            if(!guildQueue) queue.stop();
            return;
        });

        console.log(song);
        const ProgressBar = guildQueue.createProgressBar();
        console.log(ProgressBar.prettier);

        await interaction.followUp(`Now playing: ${song.name}`); */
    }
}
