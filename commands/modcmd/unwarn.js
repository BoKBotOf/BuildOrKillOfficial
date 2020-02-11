const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../../profile.json");
module.exports.run = async (bot,message,args) => {

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find (m => m.user.username == args[0] || m.id == args[0]))
      
    if(!message.member.hasPermission("KICK_MEMBERS")){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения")
    .setColor('#e22216')
    .setDescription(`<@${message.author.id}>, у вас недостаточно прав`)

    message.channel.send(embed);
        
    } else {
    if(!args[0]){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, укажите пользователя`)

    message.channel.send(embed);

    } else {
    if(!member){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, пользователь "${args[0]}" не найден`)

    message.channel.send(embed);
    } else {
        if(profile[member.id].warns <= 0){
            const embed = new Discord.RichEmbed()
        .setTitle("Предупреждения")
        .setColor('#d69002')
        .setDescription(`<@${message.author.id}>, пользователь не может иметь кол-во предупреждений < 0`)
    
        message.channel.send(embed);
    
        member.warns = 0
        } else {
    if(!profile[member.id]){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, пользователя нет в базе данных`)

    message.channel.send(embed);

    } else {
    profile[member.id].warns--;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    
    const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#25ca85')
    .setDescription(`Администратор: <@${message.author.id}>\n\nСнял предупреждение: <@${member.id}>\n\nКоличество предупреждений: **${profile[member.id].warns}/3**`)

    message.channel.send(embed);
}
}
    }
}
    }
};
module.exports.help = {
    name: "unwarn"
};