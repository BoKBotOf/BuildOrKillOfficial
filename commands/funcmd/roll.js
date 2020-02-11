const Discord = module.require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot,message,args) => {

    var rand = Math.floor(Math.random() * 100);

    var argsrand = Math.floor(Math.random() * args[0]);

        if(args[0]){
            const embed = new Discord.RichEmbed()
            .setColor(0x00BFFF)
            .setDescription(`<@${message.author.id}> выбросил число **${argsrand}** из **${args[0]}**`)
        
            message.channel.send(embed)
        } else {

    const embed = new Discord.RichEmbed()
    .setColor(0x00BFFF)
    .setDescription(`<@${message.author.id}> выбросил число **${rand}** из **100**`)

    message.channel.send(embed)
        }

    }

    module.exports.help = {
        name: 'roll',
        aliases: []
    };