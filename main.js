require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const MusicClient = require('./struct/Client');
// const client = new Discord.Client();
const client = new MusicClient();

const botPrefix = process.env.PREFIX;
const myToken = process.env.DISCORD_TOKEN;

const ytdl = require('ytdl-core');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // sync commands folder with the array

// read each js file in the commands folder
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setPresence({ activity: { type: 'LISTENING', name: 'kawaii bass | v!help' }, status: 'dnd' });
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
	if (!message.content.startsWith(botPrefix) || message.author.bot) return;

	const args = message.content.slice(botPrefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs, silly!');
	}
	
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${botPrefix}${command.name} ${command.usage}\``;
		}
		
		return message.channel.send(reply);
	}

    try {
	    command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
}
	// other commands...
});


client.login(myToken);