const Discord = module.require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot,message,args) => {

  let  vk = `https://vk.com/build_or_kill`

    const embed2 = new Discord.RichEmbed()
    .setColor(0x00BFFF)
    .setDescription(`[Мы в ВК](${vk})`)

    message.channel.send(embed2)
}
    module.exports.help = {
        name: "vk",
        aliases: []
    };