/// Les librairis que j'ai besoin pour le bot \\\

const discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require("path");
var playerstatue = "0"

/// La gestion des donner du bot \\\

const client = new CommandoClient({
    commandPrefix: "-",                                                             // Le prefix pour les commande \\
    owner: '824688287310020648',                                                    // Les infos de mon discord en cas de bug \\
    invite: 'https://discord.gg/36Z2G4Jt'
}
);

/// La gestion des commandes \\\

client.registry
    .registerDefaultTypes() 
    .registerDefaultGroups()                                                        // Les groups par defaut de discord.js/commando \\
    .registerDefaultCommands()                                                      // Les Commands par defaut de discord.js/commando \\
    .registerGroup("music", "Music")                                                // Je creer le Group music \\
    .registerCommandsIn(path.join(__dirname, "commands"));                          // Je dit que dans le dossier commands il y aura le group music et les commands \\

/// La gestion des musique \\\

client.server = {
    queue: [],                                                                       // La gestion de la queue \\
    currentVideo: {title: "", url: ""},                                              // Les donner de la video \\
    dispatcher: null,
    pause: null
};

/// Les Message dans la console \\\

client.once('ready', () => {
    console.log(`Connecte en tant que ${client.user.tag} - (${client.user.id})`)     // Dit dans la console qui est connecter en tant que \\
});

client.on("error", (error) => console.error(error));                                 // Si il a une erreur il le marque dans la console \\

/// Le Token (a quelle bot il se connecte) \\\

client.login("MTAwODcyMzE5NjI5NzYyOTY5Ng.G8fq1j.d9f1LY4CODpvlQnah8JMFTPERjMDQg2U9SV3B8")



