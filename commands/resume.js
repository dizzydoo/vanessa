module.exports = {
	name: 'resume',
	description: 'Resume the currently playing track.',
    guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resuming...');
		}
		return message.channel.send('There is nothing playing.');
	}
};