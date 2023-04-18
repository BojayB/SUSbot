require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'password',
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