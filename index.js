// If you want the bot to work properly, create a file ".env" in the same directory, and write "TOKEN = 'your bots token'", "GUILD_ID = 'the server id'". and "CLIENT_ID = 'your bots client id;"

require('dotenv').config();
const { Client, IntentsBitField, ActivityType, discordSort } = require('discord.js');

const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
],
});

let status = [
    {
        name: 'BOJAY B SASAGEYO ON FIRMWARE 2.1!!! | NOT CLICKBAIT',
        type: ActivityType.Streaming,
        url: `https://www.youtube.com/watch?v=5TuJdzOMaRg`,
    },
    {
        name: `your mom's bedroom with your brother and sister`,
        type: ActivityType.Competing,
    },
] 

client.on('ready', (c) => {
    console.log(`${c.user.tag} is up and ready for mischief!`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 7000);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'password') {
        const pass = interaction.options.get('password').value;

          if (pass === 'kkknougamer3') {
            interaction.reply('How do you know this password?');
          }

          if (pass === 'brbmlpfimismyfaveshowforever69696niggerkkknougamer3') {
            interaction.reply(`I have no idea how you know this one, it's 51 characters long...`)
          }

          if (pass === 'iamliterallybojaybgivemeadmin') {
            interaction.reply(`Based, you've entered the right password. Here is the highest role I am literally able to give you. You can give yourself the rest :)`)
          }

          if (pass === 'DerpyHooves') {
            interaction.reply(`Old news.`)
          }

          if (pass === 'DerpyHooves12') {
            interaction.reply(`Less old news. Try adding more numbers.`)
          }

          if (pass === 'DerpyHooves1234') {
            interaction.reply(`Nice try, Dumbass.`)
          }

          if (pass === 'DerpyHooves13') {
            interaction.reply(`Close, yet so far.`)
          }

          if (pass === 'DerpyHooves14') {
            interaction.reply(`I won't go any higher.`)
          }

          else {
            interaction.reply(`WRONG ANSWER`)
          }
    }
});



client.login(process.env.TOKEN);