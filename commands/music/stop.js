const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');
const discord = require("discord.js");
var playerstatue;

module.exports = class StopCommand extends Command {
    constructor(client){
        super(client, {
            name: 'stop',
            aliases: ['s'],
            group: 'music',
            memberName: 'stop',
            description: 'Stop la lecture'
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        var dispatcher = message.client.server.dispatcher
        var pause = message.client.server.pause



        if (!message.member.voice.channel) {
            
        message.reply(':x: Vous devez etre dans un salon vocal pour pouvoir utiliser cette commande.');
        return message.delete();
            
        }

        if(!message.client.voice.connections.first()) {
            message.reply(":x: Je ne suis pas connecté a un salon vocal. Tapez `-join` ou `-j` pour m'ajouter");
            return message.delete();
        }

        if (message.client.server.dispatcher.null) {
            message.reply(":x: Il y a aucune musique a mettre en pause. Tapez `-play` ou `-p` pour jouer une musique");
            return message.delete();
        }

        if (dispatcher) {
            message.delete();
            message.member.voice.channel.leave();
            dispatcher.destroy();
        }

        return message.reply(":stop_button: Stoper :thumbsup:")
    }
}