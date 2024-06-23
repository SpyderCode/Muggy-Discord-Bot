module.exports = {
    name: 'songChanged',
    execute(queue, newSong, oldSong) {
        console.log(`${newSong.name} is now playing, previously was ${oldSong.name}`);
    },
}