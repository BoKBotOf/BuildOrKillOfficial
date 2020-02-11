const discord = require('discord.js');
const utils = require('../../global/utils');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return [message.delete(), utils.timed_msg('⚠ Никакой музыки в данный момент не играет', 5000)];

    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(bot.user.avatarURL)
        .setDescription(`**-=- Музыкальная очередь -=-**\n${queue.musics.map(music => 
            `**-** ${music.title}`).join('\n')}\n\n🎵 Cейчас играет: **__${queue.musics[0].title}__**`);

    message.channel.send(embed);

};

module.exports.help = {
    name: 'queue',
    aliases: ['list', 'musiclist', 'songlist']
}