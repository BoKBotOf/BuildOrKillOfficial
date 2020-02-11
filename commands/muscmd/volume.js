const utils = require('../../global/utils');
const config = require('../../settiings/config.json');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return [message.delete(), utils.timed_msg('⚠ Никакой музыки в данный момент не играет', 5000)];
    
    if (!args[0]) return [message.delete(), message.channel.send(`🎵 Звук: **${queue.volume}/100**`)];
    if (isNaN(args[0])) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, вы должны указать значение от 0 до 100`, `${config.prefix}volume <volume>`), 5000)];
    if (args[0] < 0 || args[0] > 100) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, укажите значение от 0 до 100`, `${config.prefix}volume <volume>`), 5000)];

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return message.channel.send(`🎵 Звук был установлен на: **${queue.volume}/100**`);
};

module.exports.help = {
    name: 'volume',
    aliases: ['vol']
};