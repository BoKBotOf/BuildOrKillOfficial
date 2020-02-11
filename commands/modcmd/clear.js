const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    message.delete()

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        const embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setDescription(`<@${message.author.id}>, у вас недостаточно прав`)

        message.channel.send(embed).then(msg => msg.delete(3 * 1000))
    } else {

    if(!args[0]){
        const embed = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setDescription(`<@${message.author.id}>, укажите кол-во`)
          
          message.channel.send(embed)
    } else {

        if(args[0]>100){
            const embed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setDescription(`<@${message.author.id}>, укажите значение меньше 100`)
    
            message.channel.send(embed);
        } else {

            if(args[0]<1){
                const embed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setDescription(`<@${message.author.id}>, укажите значение больше 1`)
        
                message.channel.send(embed);
            } else {

    message.channel.bulkDelete(1)
    message.channel.bulkDelete(args[0]).then(() =>{
        
            const embed = new Discord.RichEmbed()
            .setColor(0x00BFFF)
            .setDescription(`Удалено ${args[0]} сообщений`)
    
            message.channel.send(embed).then(msg => msg.delete(3 * 1000))
        
    });

    
    
}
}
}
}
/*
   const embed = new Discord.RichEmbed()
    .setTitle("Clear command")
      .setColor(0xFF0000)
      .setDescription(`Игрок <@${message.author.id}> очистил **__${args[0]}__** собщений:\nКанал: **__${message.channel.name}__**`)
      .setTimestamp()

    bot.channels.get('605740976522133531').send(embed);
*/

};
module.exports.help = {
    name: "clear",
    aliases: []
};