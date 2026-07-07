const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Receive a random reply from an array'),
    async execute(interaction){

        const replies = ['0','random reply lol','are you not bored of this yet?','mark zuckerberg','have you ever heard of fluxis?','I bet you don\'t even play rhythm games','do you know who I am?','var response = \'bad response\'','dude have you seen morbius?','the best flavour of pizza is hamburger pizza','um.. i\'m really sorry, but... i asked for no pickles...','dude, where\'s my car?','internet reference!!!1!11','holy shit how many of these are there','in terms of human and pokemon breeding....','y\'know it\'s actually kinda fun to realize how much javascript I know after trying to code in c sharp','I probably know an equal amount of javascript to c sharp','I don\'t know c sharp','you should probably play undertale if you haven\'t','so you want a random response huh? no, this is a predicted response actually. fuck you <3','var response<string> = "finished compiling"','markiplier is genuinely inspirational','welcome to the game. you just lost.'];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        await interaction.reply(randomReply)
    },
};