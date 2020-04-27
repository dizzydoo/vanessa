const { Util } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	aliases: ['p'],
    description: 'Play a song!',
    args: true,
    usage: '<url>',
    guildOnly: true,
	 async execute(message, args) {
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send('🤭 You need to be in a voice channel to play music, silly!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send(`😢 I can't connect to your voice channel, check my permissions!`);
		if (!permissions.has('SPEAK')) return message.channel.send(`😶 I can't speak in this voice channel, check my permissions!`);

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				setTimeout(
					() => {
						queue.voiceChannel.leave();
						queue.textChannel.send(`Haven't had anything to play for five minutes 🤷‍♀️ cya later.`)
					},
					300 * 1000
				  );
				// setTimeout(queue.voiceChannel.leave(), 5000);
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url, { format: 'opus', filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 }))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Now playing: **\`${song.title}\`**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}

	}, // close execute
}; // close module export