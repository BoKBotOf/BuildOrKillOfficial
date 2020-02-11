const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        const embed = new Discord.RichEmbed()
    .setColor('#d69002')
    .setDescription(`<@${message.author.id}>, у вас недостаточно прав`)

    message.channel.send(embed)
    } else {
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
    }
};
module.exports.help = {
    name: "say"
};