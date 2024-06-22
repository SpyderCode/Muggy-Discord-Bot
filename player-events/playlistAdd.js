module.exports = {
    name: 'playlistAdd',
    execute(queue, playlist) {
        console.log(`Playlist ${playlist.name} with ${playlist.songs.length} songs has been added to the queue`);
    },
}