const discord = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core-discord');
const Client = new discord.Client;
const prefix = "-";
var playerstatue;
let membervoicechannel = false;



module.exports = class PlayCommand extends Command {
    constructor(client){
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une mussique depuis YouTube',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel musique veulez-vous lire ?',
                    type: 'string'
                }
            ]
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
     async run(message, { query }) {
        if (message.member.voice.channel){ 
            await message.member.voice.channel.join().then((connection) => {
            this.runVideo(message, connection, query);})
            message.delete()
        }
        else{
            message.reply(":x: Tu dois etre dans un salon vocale pour pouvoir utiliser cette commande.")
            message.delete()
        }
    };
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection
     * @param {string} query 
     */
    async runVideo(message, connection, query) {
        const dispatcher = connection.play( await ytdl(query, {filter: 'audioonly'}), {type: 'opus' } );
        playerstatue = playerstatue == "1";
        message.client.server.dispatcher = dispatcher 
        message.reply("Lecture de " + query)
        
        while(membervoicechannel = true) {

            dispatcher.on('finish', () => {
                message.member.voice.channel.leave();
                dispatcher.destroy();
                membervoicechannel = false
            });

            if (message.member.leave()){
                message.member.voice.channel.leave();
                dispatcher.destroy();
                membervoicechannel = false
            };
        }
        

    }
}



