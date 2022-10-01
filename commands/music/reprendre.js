const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');
var playerstatue;

module.exports = class PauseCommand extends Command {
    constructor(client){
        super(client, {
            name: 'reprendre',
            aliases: ['r'],
            group: 'music',
            memberName: 'reprendre',
            description: 'Reprend la lecture qui est actuellement en pause'
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

        var dispatcher = message.client.server.dispatcher;
        const pause = message.client.server.pause

        if (!message.member.voice.channel) {
             message.reply(':x: Vous devez être dans un salon vocal pour pouvoir utiliser cette commande.')
             return message.delete();
        }

        if(!message.client.voice.connections.first()) {
             message.reply(":x: Je ne suis pas connecté à un salon vocal. Tapez `-join` ou `-j` pour m'ajouter")
             return message.delete();
        }

        if(!dispatcher.pause) {
             message.reply(":x: Il y a aucune musique mis en pause. Tapez `-pause` ou `-x` pour mettre en attente la musique")
             return message.delete();
        }

        if (dispatcher) {
            dispatcher.resume();
            message.delete();
        }

        return message.reply("Entrain de jouer :notes:")
    }
}