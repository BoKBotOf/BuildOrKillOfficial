const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../../profile.json");
module.exports.run = async (bot,message,args) => {
    try{

        let reason = args.slice(1).join(" ") || "Не указана"
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
    if(args[0] == `<@${message.author.id}>`){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, невозможно выдать варн самому себе`)

    message.channel.send(embed);

    } else {
    if(!member){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, пользователь "${args[0]}" не найден`)

    message.channel.send(embed);
    } else {
        if(member.warns >= 3){
            const embed = new Discord.RichEmbed()
        .setTitle("Предупреждения")
        .setColor('#d69002')
        .setDescription(`<@${message.author.id}>, пользователь не может иметь кол-во предупреждений > 3`)
    
        message.channel.send(embed);
    
        member.warns = 2
    
    } else {
    if(!profile[member.id]){
        const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, пользователя нет в базе данных`)

    message.channel.send(embed);

    } else {
    profile[member.id].warns++;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    if(profile[member.id].warns >=3){
        message.guild.member(member).kick("3/3 Предупреждений");
    }
    const embed = new Discord.RichEmbed()
    .setTitle("Предупреждения:")
    .setColor('#e22216')
    .setDescription(`Администратор: <@${message.author.id}>\n\nВыдал предупреждение: <@${member.id}>\n\nПо причине: **${reason}**\n\nКоличество предупреждений: **${profile[member.id].warns}/3**`)

    message.channel.send(embed);
}
}
    }
}
    }
}

    }catch(err){
        console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
    }
};
module.exports.help = {
    name: "warn"
};