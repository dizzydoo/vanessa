module.exports = {
	name: 'ping',
	description: 'Pong!',
    guildOnly: true,
	execute(message) {
		message.channel.send("Pinging...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Pong! Took " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
			});
		}
};