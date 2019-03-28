
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        // Loading global variables
        var spawnOptions = ["Scav", "PMC", "PMC", "PMC"];
        var levelResponses = ["Customs", "Shoreline", "Woods", "Interchange", "Factory", "Labs"];
        var weaponGroups = ["Pistols", "Shotguns", "SMGs", "ARs", "Mosinlings", "Hatchet Run"];
        var tasks = ["Loot Run", "Quest Specific Run", "PMC Hunting", "Headshots Race"];
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'rollem':
                var spawn = spawnOptions[Math.floor(Math.random() * spawnOptions.length)];
                var level = levelResponses[Math.floor(Math.random() * levelResponses.length)];
                var weaponGroup = weaponGroups[Math.floor(Math.random() *
                    weaponGroups.length)];
                var task = tasks[Math.floor(Math.random() * tasks.length)];
                var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task;
                bot.sendMessage({
                    to: channelID,
                    message: response
                });
            // Just add any case commands if you want to..
        }
    }
});

// case 'rollem':
// var spawn = spawnOptions[Math.floor(math.random() * spawnOptions.length)];
// var level = levelResponses[Math.floor(Math.random() * levelResponses.length)];
// var weaponGroup = weaponGroups[Math.floor(Math.random() *
//     weaponGroups.length)];
// var task = taskResponses[Math.floor(Math.random() * taskResponses.length)];
// var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + "using " + weaponGroup + " and that your objective will be to " + task;
// bot.sendMessage({
//     to: channelID,
//     message: response
// });