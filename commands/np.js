module.exports = {
    name: 'np',
    aliases: ['nowplaying', 'playing'],
	description: `Check what's now playing.`,
    guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There's nothing playing tho. 🤷‍♀️`);
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	}
};