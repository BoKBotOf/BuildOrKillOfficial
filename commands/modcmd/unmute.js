const Discord = module.require("discord.js");
const fs = require("fs");
const { Client, RichEmbed } = require('discord.js');
module.exports.run = async (bot,message,args) => {

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find (m => m.user.username == args[0] || m.id == args[0]))
    let muterole = message.guild.roles.find(r => r.name == "Muted")

    if(!muterole){
        muterole = await message.guild.createRole({
            name:"Muted",
            permissions:[103874560]
        });
        message.guild.channels.forEach(async (channel,id) => {
            await channel.overwritePermissions(muterole,{
                SEND_MESSAGES:false,
                ADD_REACTIONS:false
            });
        });
    };

    if(!member.roles.has(muterole.id)){
        var embed = new RichEmbed()
          .setTitle('Анмут всего:')
          .setColor(0xFF0000)
          .setDescription(`<@${message.author.id}>, этот пользователь не имеет мута`);
        message.channel.send(embed);
      } else {
    
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            var embed = new RichEmbed()
              .setTitle('Анмут всего:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}>, у вас недостаточно прав`);
            message.channel.send(embed);
          } else {
        if(!args[0]){
            var embed = new RichEmbed()
              .setTitle('Анмут всего:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}>, укажите пользователя`);
            message.channel.send(embed);
          } else {
        if(!member){
            var embed = new RichEmbed()
              .setTitle('Анмут всего:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}> пользователь не найден`);
            message.channel.send(embed);
          } else {

    member.removeRole(muterole);

    var embed = new RichEmbed()
    .setTitle('Анмут всего:')
    .setColor(0x00FF00)
    .setDescription(`Администратор: <@${message.author.id}>\n\nСнял мут c: <@${member.id}>`);
  message.channel.send(embed);
};
          }
        }
    }
}
module.exports.help = {
    name: "unmute"
};