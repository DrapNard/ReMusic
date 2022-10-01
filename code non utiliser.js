const discord = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core');
const Client = new discord.Client;
const prefix = "-";
var playerstatue;



module.exports = class PlayCommand extends Command {
    constructor(client){
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une mussique depuis yt',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
async run(message) {
       const server = message.client.server; 
       
        if(discord.message.member.voice.channel){

             discord.message.member.voice.channel.join().then(connection => {
    
                    let args = discord.message.content.split(" ");
    
                    let dispatcher = connection.play(ytdl(args[1], {quality: "highestaudio"}));
                    playerstatue = 1
    
                    dispatcher.on("finish", () => {
                         dispatcher.destroy();
                         connection.disconnect();
                });
    
                dispatcher.on("error", err => {
                    console.log("Erreur de dispatcher : " + err);
                });
    
        }).catch(err => {
            message.reply(":x: Erreur lors de la connexion : " + err);
        })
    
            }
            else{
        message.reply(":x: Tu dois etre dans un salon vocale pour pouvoir utiliser cette commande.");
        }}


async run(message) {
        if(message.member.voice.channel){

             message.member.voice.channel.join().then(connection => {
    
                    let args = message.content.split(" ");
    
                    let dispatcher = connection.play(ytdl(args[1], {quality: "highestaudio"}));
    
                    dispatcher.on("finish", () => {
                         dispatcher.destroy();
                         connection.disconnect();
                });
    
                dispatcher.on("error", err => {
                    console.log("Erreur de dispatcher : " + err);
                });
    
        }).catch(err => {
            message.reply(":x: Erreur lors de la connexion : " + err);
        })
    
            }
            else{
        message.reply(":x: Tu dois etre dans un salon vocale pour pouvoir utiliser cette commande.");
        }}
}

