// If you want the bot to work properly, create a file ".env" in the same directory, and write "TOKEN = 'your bots token'", "GUILD_ID = 'the server id'". and "CLIENT_ID = 'your bots client id;"

require('dotenv').config();
const { Client, IntentsBitField, ActivityType, discordSort, PermissionFlagsBits, EmbedBuilder, ChannelType, Guild, GuildChannel, DMChannel } = require('discord.js');
const ms = require('ms');
const mongoose = require('mongoose');

const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
],
});

let status = [
    {
        name: 'New Val Map: SUNSET, Shipping With Patch 7.04!',
        type: ActivityType.Streaming,
        url: `https://www.youtube.com/watch?v=5TuJdzOMaRg`,
    },
    {
        name: `VCT 2023`,
        type: ActivityType.Competing,
    },
] 

client.on('ready', (c) => {
    console.log(`${c.user.tag} is up and ready for mischief!`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 7000);

    // Refreshes slash commands on discord
    client.application.commands.set([])
});

// const logChannel = '1098029966882517042'

// mongodb?
/*(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
        console.log('Connected to DB.');

    } catch (error) {
        console.log(`MongoDB could not connect: ${error}`);
    }
})();*/

//Welcome message





// COMMANDS
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ban') {

        const targetUserId = interaction.options.get('user').value;
        const reason = interaction.options.get('reason')?.value || "No reason given.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("User does not exist.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("Nice try, idiot.")
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        //const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition ) {
            await interaction.editReply("You are not allowed to ban this member.")
            return;
        }

       // if (targetUserRolePosition <= botRolePosition) {
       //     await interaction.editReply(`can't happen`)
       //     return;
       // }




        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`${targetUser} was banned.\nReason: ${reason}`);
        }
        catch (error) {
            interaction.editReply(`An error has occurred: ${error}`);
            console.log(`Error moment: ${error}`)
        }

    }

    if (interaction.commandName === 'kick') {

        const targetUserId = interaction.options.get('user').value;
        const reason = interaction.options.get('reason')?.value || "No reason given.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            interaction.editReply("User does not exist.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            interaction.editReply("Nice try, idiot.")
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition ) {
            await interaction.editReply("You are not allowed to kick this member.")
            return;
        }

        try {
            targetUser.kick({ reason });
            interaction.editReply(`${targetUser} was kicked.\nReason: ${reason}`);
        }
        catch (error) {
            interaction.editReply(`An error has occurred: ${error}`);
            console.log(`Error moment: ${error}`)
        }

    }   

    if (interaction.commandName === 'timeout') {

        
        const targetUserId = interaction.options.get('user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason given.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            interaction.editReply("User does not exist.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            interaction.editReply("Nice try, idiot.")
        }

        if (targetUser.user.bot) {
            await interaction.editReply('You cannot time out a bot.')
        }

        if (!targetUser.kickable) {
            interaction.editReply("You cannot time out this member.")
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply('That is not a valid duration.');
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply('Timeout duration cannot be less than 5s or more than 28d');
        }



        try {
            const { default: prettyMS } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s timeout duration has been updated: \n${prettyMS(msDuration)}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} has been timed out for ${prettyMS(msDuration)}.\nReason: ${reason}`);
        }
        catch (error) {
            interaction.editReply(`An error has occurred: ${error}`);
            console.log(`Error moment: ${error}`)
        }




    }

    if (interaction.commandName === 'badge') {
    
        await interaction.deferReply();
        await interaction.editReply('Go check Discord Dev Portal soon');
    
    }

    if (interaction.commandName === 'input') {
        const badges = interaction.user.id
        await interaction.deferReply();
        await interaction.editReply(`<@${badges}>`)
    } 

    if (interaction.commandName === 'channel'){
        if (interaction.options.getSubcommand() === 'create'){
        const channelName = interaction.options.get('name').value;
        const channelType = interaction.options.get('type').value;
        const adminRole = interaction.guild.roles.cache.find(role => role.name === 'Mythic');
        if (!interaction.member.roles.cache.has(adminRole.id)) {
            interaction.reply('You are unable to create channels ;)')
            return;
        }
        
        const channelTypes = [ChannelType.GuildText, ChannelType.GuildVoice, ChannelType.GuildAnnouncement]

        interaction.guild.channels.create(
        {
            name: `${channelName}`,
            type: channelTypes[channelType]
        },
        ).then(channel => (interaction.reply(`Channel Created! <#${channel.id}>`)))
        .catch(console.error);
        }
        if (interaction.options.getSubcommand() === 'delete'){
        //check if user has a specific role (get said role id)
        const adminRole = interaction.guild.roles.cache.find(role => role.name === 'Mythic');
        if (!interaction.member.roles.cache.has(adminRole.id)) {
            interaction.reply('You are unable to delete channels ;)')
            return;
        }
        const channelName = interaction.options.get('channel').value
        interaction.guild.channels.delete(channelName)
        .then (interaction.reply('Channel deleted!'))
        .catch(console.error)    
        console.log()
        }
    }
    
    if (interaction.commandName === 'reputation'){
    let funnyNameArray = [' ',];
    let funnyNameArrayValue = [' ',];

    if (interaction.options.getSubcommand() === 'add'){
        const repUser = interaction.options.get('user').value;
        const repValue = interaction.options.get('amount').value;
        if (!repUser.indexOf(funnyNameArray)){
            funnyNameArray.push(repUser);
            funnyNameArrayValue.push(repValue);
            interaction.reply(`+${repValue} rep for <@${repUser}>`)
            console.log(funnyNameArray, funnyNameArrayValue)
            return;
        }
        if (repUser.indexOf(funnyNameArray)){
            const funnyDifference = funnyNameArrayValue + repValue;
            funnyNameArrayValue.splice([repUser, funnyDifference]);
            interaction.reply(`+${repValue} rep for <@${repUser}>`)
            console.log(funnyNameArray, funnyNameArrayValue)
            return;
        }
        
    }

    if (interaction.options.getSubcommand() === 'check'){
        const repUser = interaction.options.get('user').value;
        const repValue = funnyNameArrayValue[`${repUser}`]
        if (!repUser.indexOf(funnyNameArray)){
            interaction.reply('That user does not have any reputation yet!')
            return;
        }
        if (repUser.indexOf(funnyNameArray)){
            interaction.reply(`<@${repUser}> has ${repValue} rep!`)

        }
    }

    if (interaction.options.getSubcommand() === 'remove'){
        const repUser = interaction.options.get('user').value;
        const repValue = interaction.options.get('amount').value;
        if (!repUser.indexOf(funnyNameArray)){
            const repNegative = repValue - repvalue*2
            funnyNameArray.push(repUser);
            funnyNameArrayValue.push(repNegative);
            interaction.reply(`<@${repUser}> lost -${repValue})`)
            console.log(funnyNameArray, funnyNameArrayValue)
            return;
        }
        if (repUser.indexOf(funnyNameArray)){
            const funnyDifference = funnyNameArrayValue + repValue;
            funnyNameArrayValue.splice([repUser, funnyDifference]);
            interaction.reply(`+${repValue} rep for <@${repUser}>`)
            console.log(funnyNameArray, funnyNameArrayValue)
            return;
        }    
    }
    }
       
});








// failed non slash commands

/*client.on('message', async (message) => {

    if (message.MessageContent === 'just')
	{
		message.reply('fmsu');
	}

});*/

/*client.on("messageReactionAdd", (e, user) => {
    if (user && !user.bot && e.message.channel.id('930957040564727820')) //change channel.id to the channel you want the bot to check for reactions in
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
                e.message.guild.member(user).roles.add(i).catch(console.error);
                // console.log('added role');
            }
});

client.on("messageReactionRemove", (e, n) => {
    if (n && !n.bot && e.message.channel.id('930957040564727820'))
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
                e.message.guild.member(n).roles.remove(i).catch(console.error)
                // console.log('removed role');
            }
});*/


client.login(process.env.TOKEN);