module.exports = {
	name: 'stop',
	description: 'Stops the bot and clears the queue.',
    guildOnly: true,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`🤭 You need to be in a voice channel to do that, ya silly!`);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There's nothing playing tho. 🤷‍♀️`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		message.channel.send(':stop_button: Queue cleared and song stopped c:');
	}
};