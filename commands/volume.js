module.exports = {
	name: 'volume',
	aliases: ['vol'],
    description: 'Set the volume of the bot/now playing track. Anything below 25% may be inaudible',
    usage: '<0-100>',
    guildOnly: true,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`🤭 You need to be in a voice channel to do that, ya silly!`);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There's nothing playing tho. 🤷‍♀️`);
		actualVol = serverQueue.volume * 50 
		if (!args[0]) return message.channel.send(`🔊 The current volume is: **${actualVol}%**`);
		cleanNums = args[0].replace(/[^\d.-]/g, '');
		serverQueue.volume = (cleanNums / 50); // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		return message.channel.send(`🔊 Set the volume to: **${cleanNums}%**`);
	}
};