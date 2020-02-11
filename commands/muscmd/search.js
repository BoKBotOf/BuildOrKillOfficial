const discord = require('discord.js');
const utils = require('../../global/utils');
const config = require('../../settiings/config.json');

module.exports.run = async (bot, message, args) => {

    let VC = message.member.voiceChannel;
          
                VC.join()
    if (!VC) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, вы должны находиться в голосовом канале`, `${config.prefix}play <music/url>`), 5000)];

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, укажите url\nЕсли вы хотите список музыки, используйте: ~search`, `${config.prefix}play <music/url>`), 5000)];

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, у меня нет возможностей подключится к данному каналу`, `${config.prefix}play <music/url>`), 5000)];
    if (!perms.has('SPEAK')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, у меня нет возможностей говорить в данном канале`, `${config.prefix}play <music/url>`), 5000)];

    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return message.channel.send(`🎵 **${playlist.title}** была добавлена в очередь`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var videos = await bot.youtube.searchVideos(searchString, 10);
                let index = 0;

                let embed = new discord.RichEmbed()
                    .setColor(0x00FFFF)
                    .setThumbnail(bot.user.avatarURL)
                    .setDescription(`**-=- Результаты поиска -=-**\n${videos.map(video => 
                        `**${++index} -** ${video.title}`).join('\n')}\n\n🎵 Выберите музыку написав число от 1 до 10\nУ вас 30 секунд**`);

                message.channel.send(embed);

                try {
                    var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
                        maxMatches: 1,
                        time: 30000,
                        errors: ['time']
                    });
                } catch (err) {
                    if (err) undefined
                    return message.channel.send(utils.cmd_fail('⚠ Вы не успели выбрать музыку за 30 секунд', `${config.prefix}search <music>`));
                }
                const videoIndex = parseInt(response.first().content);
                var video = await bot.youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, no videos can be found with the argument \`${searchString}\``, `${config.prefix}play <music/url>`), 5000)];
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};

module.exports.help = {
    name: 'search',
    aliases: []
};