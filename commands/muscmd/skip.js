const utils = require('../../global/utils');
const config = require('../../settiings/config.json');
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    message.delete()

    let queue = bot.queue.get(message.guild.id);
    let votes = bot.votes.get(message.guild.id);
    if (!message.member.voiceChannel) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, вы должны находиться в голосовом канале`, `${config.prefix}skip`), 5000)];
    if (!queue) return [message.delete(), utils.timed_msg('⚠ Никай музыки не играет', 5000)];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (votes.voters.includes(message.author.id)) return [message.delete(), utils.timed_msg(utils.cmd_fail(`⚠ ${message.author} вы уже голосовали за пропуск. **${votes.votes}/3** голосов`, `${config.prefix}skip`), 5000)];



        
        votes.votes++
        votes.voters.push(message.author.id);

        let embed = new discord.RichEmbed()
        .setColor(0x00FFFF)
        .setDescription(`🎵 ${message.author} проголосовал за пропуск **${votes.votes}/3** голосов🎵`)

        message.channel.send(embed);

        if (votes.votes > 3) return queue.connection.dispatcher.end();
    } else return queue.connection.dispatcher.end();

    
};

module.exports.help = {
    name: 'skip',
    aliases: []
};