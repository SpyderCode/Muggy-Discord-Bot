module.exports = {
    name: 'songAdd',
    execute(queue, song) {
        console.log(`Song ${song.name} has been added to the queue`);
    },
}