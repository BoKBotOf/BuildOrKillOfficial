const Discord = module.require("discord.js");
const { Client, RichEmbed } = require('discord.js');
const fetch = require("node-fetch")
const { stripIndents } = require("common-tags")
const dateFormat = require('dateformat')

module.exports.run = async (bot,message,args) => {

const token = "E76354803F6E11B108317EFDDFF80192"
if(!args[0])
{
    let embed = new Discord.RichEmbed()
    .setColor(0x000000)
    .setDescription(`<@${message.author.id}>, укажите пользователя!`)

    message.channel.send(embed).tnen(message => message.delete(5000))
} else {
const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join("")}`;

fetch(url).then(res => res.json()).then(body => {
    if(body.response.succes === 42) {
        let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setDescription(`<@${message.author.id}>, мне не удалось найти пользователя с таким никнеймом. [1]`)
    
        message.channel.send(embed).tnen(message => message.delete(5000))

    } else {

        const id = body.response.steamid;
        const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`
        const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`
        const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"]

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send ("Мне не удалось найти пользователя с таким никнеймом. [2]").then(message => message.delete(5000))
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0]

            fetch(bans).then(res => res.json()).then(body => {
                if(!body.players) return message.channel.send ("Мне не удалось найти пользователя с таким никнеймом. [3]").then(message => message.delete(5000))
                const { NumberOfVACBans, NumberOfGameBans } = body.players[0]

                const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Настоящее имя:** ${realname || "Неизвестно"}
                **Статус:** ${state[personastate]}
                **Страна:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Аккаунт создан:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Баны:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Ссылка:** [Ссылка на профиль](${profileurl})`)
                .setTimestamp()

                message.channel.send(embed)
            })
        })
    }
})
}


}
    module.exports.help = {
        name: "steam",
        aliases: []
    };