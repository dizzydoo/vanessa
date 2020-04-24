module.exports = {
	name: 'leave',
	description: 'Stops playback, clears queue and makes the bot leave the channel.',
    guildOnly: true,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('You need to be in a voice channel to use a command like this :flushed:');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There\'s nothing playing tho.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		message.channel.send(':wave: cya later, nerd!');
	}
};