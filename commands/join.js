module.exports = {
	name: 'join',
	description: 'Makes the bot join the voice channel.',
    guildOnly: true,
	execute(message) {
		if (message.member.voice.channel) try {
			const connection = message.member.voice.channel.join();
			setTimeout(
				() => {
					message.member.voice.channel.leave();
					message.channel.send(`Haven't had anything to play for five minutes 🤷‍♀️ cya later.`)
				},
				300 * 1000
			  );
          } catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	}
};