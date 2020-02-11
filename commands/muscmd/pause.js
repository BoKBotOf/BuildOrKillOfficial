const utils = require('../../global/utils');
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    
    if (queue && queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause();

        let embed = new discord.RichEmbed()
        .setColor(0x00FFFF)
        .setDescription(`🎵 ${message.author} приостановил музыку 🎵\n`)

        message.channel.send(embed);

    }

    return [message.delete(), utils.timed_msg('⚠ Никакой музыки в данный момент не играет', 5000)];
    
};

module.exports.help = {
    name: 'pause',
    aliases: []
};