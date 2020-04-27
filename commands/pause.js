module.exports = {
	name: 'pause',
    description: 'Pause the currently playing track.',
    guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused!');
		}
		return message.channel.send(`There's nothing playing tho. 🤷‍♀️`);
	}
};