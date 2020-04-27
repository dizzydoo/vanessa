module.exports = {
	name: 'leave',
	description: 'Makes the bot leave the voice channel.',
    guildOnly: true,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`🤭 You need to be in a voice channel to do that, ya silly!`);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue) {
			serverQueue.songs = [];
			serverQueue.connection.dispatcher.end();
		} 
		message.member.voice.channel.leave();
		message.channel.send('👋 cya later, nerd!');
	}
};