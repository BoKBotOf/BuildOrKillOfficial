const Discord = module.require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot,message,args) => {

let ask = args.slice(0).join(" ") || "Не указан"

var rand = Math.floor(Math.random() * 9);

    if(rand == 1){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Да`)
        message.channel.send(embed)

    } else {

    if(rand == 2){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Нет`)
        message.channel.send(embed)
    } else {

    if(rand == 3){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Возможно`)
        message.channel.send(embed)

    } else {

    if(rand == 4){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Скорее всего`)
        message.channel.send(embed)

    } else {


    if(rand == 5){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Ни в коем случае`)
        message.channel.send(embed)

    } else {


    if(rand == 6){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Конечно`)
        message.channel.send(embed)

    } else {


    if(rand == 7){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Определенно нет`)
        message.channel.send(embed)

    } else {


    if(rand == 8){



        const embed = new Discord.RichEmbed()
        .setColor(0x00BFFF)
        .setDescription(`Вопрос: ${ask}\n\nОтвет: Может быть`)
        message.channel.send(embed)

    } else {
        if(rand == 9){
message.channel.send("Если вы видите это сообщение, то Пико опять сделал какую-то фигню и вы это видите")
        }


    }}}}}}}}}


    module.exports.help = {
        name: 'ball',
        aliases: []
    };
