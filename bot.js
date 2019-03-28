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
var spawn = "";
var level = "";
var weaponGroup = "";
var task = "";

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        // Loading global variables
        var spawnOptions = ["Scav", "Scav", "Scav", "PMC", "PMC", "PMC", "PMC", "PMC", "PMC", "PMC"];
        var levelResponses = ["Customs", "Shoreline", "Woods", "Interchange", "Factory", "Labs"];
        var weaponGroups = ["Pistols", "Shotguns", "SMGs", "ARs", "Mosins", "Melee Weapons"];
        var tasks = ["do a Loot Run (Most Money acquired from items in raid Wins)", "a Quest Specific Run", "go PMC Hunting (Highest number of kills wins)", "Participate in a Headshots Race. Each headshot adds 5 points to your total. Each non-headshot kill removes 2 points from your total. Highest Score at end of the round wins", "Hunt the Scav Boss", "Collect a new Key", "not kill two people in a row (AI or PMCs) using the same weapon", "Do a Metal Gear Run. Silenced Pistol, Covert Movement", "No Meds", "Hatchling Run", "Cosplay Run - Blueberry", "Cosplay - Mike Myers", "Cosplay - Gym Teacher"];
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
                spawn = spawnOptions[Math.floor(Math.random() * spawnOptions.length)];
                level = levelResponses[Math.floor(Math.random() * levelResponses.length)];
                weaponGroup = weaponGroups[Math.floor(Math.random() *
                    weaponGroups.length)];
                task = tasks[Math.floor(Math.random() * tasks.length)];
                if (spawn === "PMC") {
                    if (task === "Hunt the Scav Boss" && (level === "Woods" || "Shoreline" || "Factory" || "Labs")) {
                        var newLevels = ["Customs", "Interchange"];
                        var newLevel = newLevels[Math.floor(Math.random() * newLevels.length)];
                        level = newLevel;
                        var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task + ".";
                    } else if (task === "a Quest Specific Run") {
                        var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task + ". If no members of the party currently have quests on this map, please roll again using !rerolllvl.";
                    } else if (level == "Labs") {
                        var response = "The Wheel of Tarkov has determined that you will do a PMC run on Labs. You may outfit yourself with " + weaponGroups + " and grenades. Your primary goal is to " + task;
                    } else {
                        var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task + ".";
                    }
                } else if (spawn === "Scav") {
                    if (task === "a Quest Specific Run") {
                        var scavTasks = ["Pretend to be an AI for at least 5 minutes of your raid", "Do not kill two people in a row (AI or PMCs) using the same weapon", "Participate in a Headshots Race. Each headshot adds 5 points to your total. Each non-headshot kill removes 2 points from your total. Highest Score at end of the round wins", "to Hunt the Scav Boss"];
                        var newTask = scavTasks[Math.floor(Math.random() * scavTasks.length)];
                        task = newTask;
                        var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + ". Using your given weapon, Your main objective will be to" + task + ".";
                    } else if (level === "Labs") {
                        var scavLevels = ["Customs", "Shoreline", "Woods", "Interchange", "Factory"];
                        var newLevel = scavLevels[Math.floor(Math.random() * scavLevels.length)];
                        level = newLevel;
                    } else {
                        var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + ". Using your given weapon, Your main objective will be to" + task + ".";
                    }
                }
                bot.sendMessage({
                    to: channelID,
                    message: response
                });
                break;
            case 'rerolllvl':
                level = levelResponses[Math.floor(Math.random() * levelResponses.length)];
                var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task + ". If no members of the party currently have quests on this map, please roll again using !reroll.";
                bot.sendMessage({
                    to: channelID,
                    message: response
                });
                break;
            case 'rerollweap':
                weaponGroup = weaponGroups[Math.floor(Math.random() * weaponGroups.length)];
                var response = "The Wheel of Tarkov has determined that you will do a " + spawn + " run on " + level + " while using " + weaponGroup + ". Your main objective will be to " + task + ". If no members of the party currently have quests on this map, please roll again using !reroll.";
                bot.sendMessage({
                    to: channelID,
                    message: response
                });
                break;
                // Just add any case commands if you want to..
        }
    }
});

