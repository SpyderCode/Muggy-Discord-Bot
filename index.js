//Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Player } = require('@rafateoli/discord-music-player');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');

//Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages] });

//Create a new player instance
const player = new Player(client, {
    leaveOnEmpty: true,
    volume: 30,
    quality: 'high',
    deafenOnJoin: true
});
client.player = player;

client.commands = new Collection();
client.cooldowns = new Collection();


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        //Set a new item in the Collection with the key as the command name and the value as the exported module

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//Register the event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//Register the player events
const playerEventsPath = path.join(__dirname, 'player-events');
const playerEventFiles = fs.readdirSync(playerEventsPath).filter(file => file.endsWith('.js'));

for (const file of playerEventFiles) {
    const filePath = path.join(playerEventsPath, file);
    const playerEvent = require(filePath);
    if(playerEvent.once) {
        client.player.once(playerEvent.name, (...args) => playerEvent.execute(...args));
    } else {
        client.player.on(playerEvent.name, (...args) => playerEvent.execute(...args));
    }
}

//Login to Discord with your app's token
client.login(token);