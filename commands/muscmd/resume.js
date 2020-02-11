const utils = require('../../global/utils');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    
    if (queue && !queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();

        let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`🎵 ${message.author} воозобновил музыку 🎵\n`)

        message.channel.send(embed);

    }

    return [message.delete(), utils.timed_msg('⚠ Никакой музыки не играет в данный момент.', 5000)];
    
};

module.exports.help = {
    name: 'resume',
    aliases: []
};