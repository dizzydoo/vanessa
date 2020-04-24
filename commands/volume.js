module.exports = {
	name: 'volume',
	aliases: ['vol'],
    description: 'Set the volume of the bot/now playing track.',
    usage: '<0-2>',
    guildOnly: true,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`You need to be in a voice channel to do that, ya silly!`);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There's nothing playing tho. :woman_shrugging:`);
		if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`I set the volume to: **${args[0]}**`);
	}
};