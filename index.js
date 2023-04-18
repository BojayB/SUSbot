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
            interaction.reply('LOOOL IDK HOW YOU FIGURED THIS OUT BUT THAT IS ONE OF MY PASSWORDS, NOT TELLING YOU WHICH ONE THOUGH!!!');
          }

          if (pass === 'brbmlpfimismyfaveshowforever69696niggerkkknougamer3') {
            interaction.reply(`Okay, you just entered my longest password AND a seperate passowrd in one, both of which are used by me very frequently.... You're either me, Cameron, or I'm really going to have to reset my password AGAIN. Do you know how long that is? THAT IS A 51 CHARACTER LONG PASSWORD! I'VE BEEN HIJACKED SO MANY TIMES MAN I'M OVER IT! Just keep the accounts idgaf. Try and figure out what they are, I dare you... `)
          }

          if (pass === 'iamliterallybojaybgivemeadmin') {
            interaction.reply(`Based, you've entered the right password. Here is the highest role I am literally able to give you. You can give yourself the rest :)`)
          }

          if (pass === 'DerpyHooves') {
            interaction.reply(`Old password, old news. Maybe you can hack my Armour Games or Kongregate accounts, except that you CAN'T because those passwords ar so old that I've updated them. Nice try pal`)
          }

          if (pass === 'DerpyHooves12') {
            interaction.reply(`This is the second oldest password that I remember using. I actually don't remember a password before DerpyHooves other than my steam password. But again, 2014 era password. You're gonna need to add a few more numbers to the list.`)
          }

          if (pass === 'DerpyHooves1234') {
            interaction.reply(`Nice try, Dumbass.`)
          }

          if (pass === 'DerpyHooves13') {
            interaction.reply(`Okay, maybe NOW you could hack my Armour Games or Kongregate account. This one is the one I think of using for all of my older accounts, like, 2015-16 era. No like seriously, go to Armour Games and use my email and this password. It should work. I don't care if you use it, just don't lock me out or get me banned, it's a nice memory to look back on. Go write me a forum post to look at in the next 5-10 years the next time I remember those sites exist.`)
          }

          if (pass === 'DerpyHooves14') {
            interaction.reply(`Nah seriously, stop adding numbers now. If you've been doing this and aren't actually me, I'd genuinely like you to stop. I'm getting worried now. This is the password I use for 2 very important things that I have not changed yet. This was like, updating old passwords for current year things. This is my fuckin Microsoft password bro. Go any higher and you'll have full access to almost every single account I've ever made for anything ever. Like, I seriously don't know why I'm telling you this. I'm being dead serious. Please don't hijack my accounts, I'm sick of updating passwords. I've only JUST reached 18 and 18 is such a new number I can't even tell you what I used it for at the moment. Stop guessing :(`)
          }

          else {
            interaction.reply(`WRONG ANSWER`)
          }
    }
});



client.login(process.env.TOKEN);