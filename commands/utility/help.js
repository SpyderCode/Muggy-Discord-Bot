const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all commands'),
    async execute(interaction) {
        const commands = interaction.client.commands;
        const commandList = commands.map(command => `**/${command.data.name}** - ${command.data.description}`).join('\n');
        return await interaction.reply(commandList);
    }
}