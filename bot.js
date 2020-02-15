const Discord = require('discord.js');
const bot = new Discord.Client({
  disableEveryone: true
});
const utils = require('./global/utils');
const ytdl = require('ytdl-core');
const config = require('./settiings/config.json');
const YouTube = require('simple-youtube-api');
const {YouTubeAPIKey} = require('./settiings/credentials.json');
const message = require('./handlers/message');
const { Client, RichEmbed } = require('discord.js');

require('./global/functions')(bot, utils, ytdl, config);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.youtube = new YouTube(YouTubeAPIKey); // YouTube Client
bot.queue = new Map() // Music Queue
bot.votes = new Map(); // Vote Skip
message.message(bot, utils, config, Discord);


bot.login("Njc0NjIwMjA2ODY1MTg2ODQ2.Xkeofg.Y8PaxNXOQ8Yf6Hw-oBC-V5CYNt0")


bot.on('message', message => {
  if(message.author.bot)
  {
    if(message.embeds)
    {
      const embedMsg = message.embeds.find(msg => msg.title === "Вспомогательные роли")
      if(embedMsg)
      {
        message.react("676011179612831754")
        .then(reaction => reaction.message.react("676013447489650708"))
        .then(reaction => reaction.message.react("676011964421636106"))
      }
    }
    return;
  }

if(message.content == "!extension"){
  message.delete()
  if(message.author.id == "329462919676821504"){
    const embed = new RichEmbed()
    .setTitle("Вспомогательные роли")
    .setColor(0x00BFFF)
    .setDescription("<:E2:676011179612831754> - Expression 2\n<:Pac3:676013447489650708> - Pac 3\n<:Wiremod:676011964421636106> - Wire mod\n\nP.S Выбирайте роли, только если вы разбираетесь в данной сфере, так как данные роли могут пинговаться и мешать вам!")
    message.channel.send(embed)
  } else {
    message.channel.send("Вы не администратор").then(message => message.delete(5000))
  }
}
});

bot.on("messageReactionAdd", (reaction, user) => {
  if(user.bot) return;

  var roleName = reaction.emoji.name;
  var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  var member = reaction.message.guild.members.find(member => member.id === user.id);

  if(member.roles.has(role.id))
  {
    member.removeRole(role.id).then(member =>{

    })
  } else {
    member.addRole(role.id)
  }
});




bot.on('ready', () => {
    
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(8).then(link =>{
        console.log(link);
    
    });
});


setInterval(() => {
  var request = require('request');
  var URL = 'https://gamemonitoring.net/ru/server138201';
  request(URL, function (err, res, body) {
    if (err) throw err;
    var con = body.indexOf('/44')
    var con2 = con - 2
    if (con == -1){
      setInterval(() => {
        var request = require('request');
        var URL = 'https://garrys-servers.ru/server-596#';
        request(URL, function (err, res, body) {
          if (err) throw err;
          var con=body.indexOf(' 44')
          var con2=con-5
          if (con == -1){
            bot.user.setActivity("Сервер не работает")
          }
          else{
          bot.user.setActivity("онлайн " + body[con2] + body[con2 + 1] + "/" + body[con + 1] + body[con + 2], {type: "WATCHING"});
          }
      
        });
      }, 10000);
    }
    else{
    bot.user.setActivity("онлайн " +  " " + body[con2] + body[con2 + 1] + body[con2 + 2] + body[con2 + 3] + body[con2 + 4], {type: "WATCHING"});
    }
  });
}, 10000);


// Second monitoring
/*
setInterval(() => {
  var request = require('request');
  var URL = 'https://garrys-servers.ru/server-596#';
  request(URL, function (err, res, body) {
    if (err) throw err;
    var con=body.indexOf(' 44')
    var con2=con-5
    if (con == -1){
      bot.user.setActivity("Сервер не работает")
    }
    else{
    bot.user.setActivity("онлайн " + body[con2] + body[con2 + 1] + "/" + body[con + 1] + body[con + 2], {type: "WATCHING"});
    }

  });
}, 10000);
*/




// Auto-role giving /////////////////////////
bot.on('guildMemberAdd', member => {

  var role = member.guild.roles.find('name', 'Игрок')

  member.addRole(role)

});
/////////////////////////////////////////////








// Message Logging
bot.on('messageUpdate', async(oldMessage, newMessage) => {

  if(newMessage.content.startsWith("!")){

  } else {
    
    if(newMessage.content == oldMessage.content){

    } else {

    }

  let logEmbed = new Discord.RichEmbed()

  .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
  .setThumbnail(oldMessage.author.avatarURL)
  .setColor(0xFF8C00)
  .setDescription("Сообщение от пользователя было изменено")
  .addField("До:", oldMessage.content, true)
  .addField("После:", newMessage.content, true)
  .addField("Канал:", oldMessage.channel, true)
  .setTimestamp()
  .setFooter("Message updating log")

  bot.channels.get('674073274090782740').send(logEmbed);

  }
});

bot.on('messageDelete', async(message) => {

  if(!message.author.bot){

  let logEmbed = new Discord.RichEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .setColor(0xB22222)
  .setDescription("Сообщение пользователя было удалено")
  .addField("Удаленное сообщение:", message.content, true)
  .addField("Канал:", message.channel, true)
  .setTimestamp()
  .setFooter("Message deleting log")

  bot.channels.get('674073274090782740').send(logEmbed);
  
  }

});


