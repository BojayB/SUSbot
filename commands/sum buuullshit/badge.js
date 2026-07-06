const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('badge')
    .setDescription('Gives Bojay B his Active Bot Discord Badge or whatever.'),
    async execute(interaction) {
        await interaction.reply('Haha they got rid of this a while ago now lol');
    },
};