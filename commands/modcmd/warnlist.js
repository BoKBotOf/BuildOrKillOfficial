const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../../profile.json");
const { Client, RichEmbed } = require('discord.js');
module.exports.run = async (bot,message,args) => {

try{
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find (m => m.user.username == args[0] || m.id == args[0]))


    const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('0xD2691E')
    .setDescription(`Пользователь: <@${member.id}>\n\nКол-во предупреждений: **${profile[member.id].warns}**`)

    const embed2 = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('0x00FF00')
    .setDescription(`Пользователь: <@${member.id}> не имеет предупреждений`)

    if(profile[member.id].warns <= 0) return message.channel.send(embed2)
    if(profile[member.id].warns >= 1) return message.channel.send(embed)




}catch(err){
    console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
}
message.channel.send(embed)
}

module.exports.help = {
    name: "warnlist",
    aliases: []
};