module.exports = {
    name: 'error',
    execute(queue, error) {
        console.log(`An error occurred in ${queue.guild}: ${error.message}`);
    },
}