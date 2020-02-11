const Discord = module.require("discord.js");
const { Client, RichEmbed } = require('discord.js');
module.exports.run = async (bot,message,args) => {

    if(!args[0]){

        const embed1 = new Discord.RichEmbed()
          .setDescription(`Аватар игрока <@${message.author.id}>`)
            .setColor(0x00BFFF)
            .setImage(`${message.author.avatarURL}`)
    
            message.channel.send(embed1)
    } else {

let member = message.guild.member(message.mentions.users.first() || message.guild.members.find (m => m.user.username == args[0] || m.id == args[0]))
let argsUser = member.user



const embed2 = new Discord.RichEmbed()
      .setDescription(`Аватар игрока <@${member.id}>`)
        .setColor(0x00BFFF)
        .setImage(`${argsUser.avatarURL}`)

    message.channel.send(embed2)
}
  
}

  module.exports.help = {
    name: "avatar",
    aliases: []
};