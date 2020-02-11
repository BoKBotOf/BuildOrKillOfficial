const utils = require('../../global/utils');
const config = require('../../settiings/config.json');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, вы должны находится в голосовом канале`, `${config.prefix}stop`), 5000)];
    if (!queue) return [message.delete(), utils.timed_msg('⚠ Никакой музыки в данный момент не играет', 5000)];

    queue.musics = [];
    queue.connection.dispatcher.end();

};

module.exports.help = {
    name: 'stop',
    aliases: ['leave']
};