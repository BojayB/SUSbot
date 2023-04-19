require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {   name: 'password',
        description: 'The secret password',
        options: [
            {
                name: 'password',
                description: 'Try to guess the server secret...',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {   name: 'ban',
        description: 'Bans a user',
        options: [
            {
                name: 'user',
                description: 'Username of the user you want to ban. You must have ban privileges.',
                type: ApplicationCommandOptionType.Mentionable,
                required: true,
            },
            {
                name: 'reason',
                description: 'Reason why you are banning the mentioned user.',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
    {   name: 'kick',
        description: 'Kicks a user',
        options: [
            {
                name: 'user',
                description: 'Username of the user you want to kick. You must have kick privileges.',
                type: ApplicationCommandOptionType.Mentionable,
                required: true,
            },
            {
                name: 'reason',
                description: 'Reason why you are kicking the mentioned user.',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
    {   name: 'timeout',
        description: 'Times out a user',
        options: [
            {
                name: 'user',
                description: 'The user you would like to timeout.',
                type: ApplicationCommandOptionType.Mentionable,
                required: true,
            },
            {
                name: 'duration',
                description: 'The timeout duration (30m, 4 hours, 1 week).',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'reason',
                description: 'Timeout reason',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },

];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Regieristeiring your mom`);

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log(`Your mother has been successfully regieristeired`)
    }   catch (error) {
           console.log(`An error has occured: ${error}`);
        }
})();