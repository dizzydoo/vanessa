module.exports = {
	name: 'queue',
	aliases: ['q'],
	description: `Check the bot's queue.`,
    guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`ain't nobody here but us chickens, **queue's empty.**`);
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	}
};