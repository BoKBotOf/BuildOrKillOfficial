const { Client, RichEmbed } = require('discord.js');
const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

  let member = message.guild.member(message.mentions.users.first() || message.guild.members.find (m => m.user.username == args[0] || m.id == args[0]))
  let muterole = message.guild.roles.find(r => r.name == "Muted")
  let reason = args.slice(1).join(" ") || "Не указана"

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

        if(!message.member.hasPermission("MANAGE_ROLES")){
          message.delete(1)
            var embed = new RichEmbed()
              .setTitle('Мут:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}> у вас недостаточно прав`);
            message.channel.send(embed);
          } else {

          if(!args[0]){
            message.delete(1)
            var embed = new RichEmbed()
              .setTitle('Мут:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}> укажите пользователя`);
            message.channel.send(embed);
          } else {

          if(!member){
            message.delete(1)
            var embed = new RichEmbed()
              .setTitle('Мут:')
              .setColor(0xFF0000)
              .setDescription(`<@${message.author.id}> пользователь не найден`);
            message.channel.send(embed);
          } else {

if(member.roles.has(muterole.id))
  {
    message.delete(1)
    var embed = new RichEmbed()
      .setTitle('Мут:')
      .setColor(0xFF0000)
      .setDescription(`<@${message.author.id}> этот пользователь уже имеет мут`);
    message.channel.send(embed);
  } else {

          
            message.delete(1)
            var embed = new RichEmbed()
              .setTitle('Мут:')
              .setColor(0xFF0000)
              .setDescription(`Администратор: <@${message.author.id}>\n\nВыдал Мут: <@${member.id}>\n\nПо причине: **${reason}**`);
            message.channel.send(embed);
          member.addRole(muterole.id)
    }
}
          }
        }
    }



module.exports.help = {
    name: "mute",
    aliases: []
};