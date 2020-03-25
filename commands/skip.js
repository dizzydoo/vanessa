module.exports = {
    name: 'skip',
    aliases: ['s'],
	description: 'Skips the currently playing song.',
    guildOnly: true,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(`You need to be in a voice channel to do that, ya silly!`);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There's nothing playing tho. :woman_shrugging:`);
		serverQueue.connection.dispatcher.end(`*Skipping...* :ok_hand:`);
	}
};