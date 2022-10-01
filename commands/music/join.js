const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class JoinCommand extends Command {
    constructor(client){
        super(client, {
            name: 'join',
            aliases: ['j'],
            group: 'music',
            memberName: 'join',
            description: 'Fait rejoindre le bot'
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {


        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.delete();
            return message.reply(':x: Vous devez etre dans un salon vocal pour pouvoir utiliser cette commande.');
        }

        await voiceChannel.join();
        message.delete();
        return message.reply(":thumbsup: J'ai rejoints le salon vocal" + "`"+ voiceChannel.name +"`");
    }
}