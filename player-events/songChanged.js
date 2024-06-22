module.exports = {
    name: 'songChanged',
    execute(queue, oldSong, newSong) {
        console.log(`${newSong.name} is now playing, previously was ${oldSong.name}`);
    },
}