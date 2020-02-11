module.exports = {
    
  

  message: (bot, utils, config, discord) => {
      bot.on('message', async message => {

          const fs = require('fs');
          const { Client, RichEmbed } = require('discord.js');
          let prefix = config.prefix;
          let profile = require('../profile.json');

          if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  let uid = message.author.id;
  bot.send = function (msg){
      message.channel.send(msg);
  };
  if(!profile[uid]){
      profile[uid] ={
          warns:0,
          total_message: 0
      };
  };
  let u = profile[uid];

  u.total_message++;


  fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
      if(err) console.log(err);
  });



 
            let messageArray = message.content.split(" ");

            if(!message.content.startsWith(prefix)) return;
            let args = message.content.slice(prefix.length).trim().split(' ');
            let cmd = args.shift().toLowerCase();
            let command = messageArray[0].toLowerCase();
            bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            bot.uId = message.author.id;         

          if (message.author.bot) return;
          if (message.channel.type === "dm") return;


          
          if (!message.content.startsWith(config.prefix)) return;
          if (bot.commands.has(cmd)) {
              command = bot.commands.get(cmd);
          } else if (bot.aliases.has(cmd)) {
              command = bot.commands.get(bot.aliases.get(cmd));
          }

          if (config.commandNotFound == true) {
              try {
                  command.run(bot, message, args);
              } catch (err) {
                  if (err) utils.timed_msg(utils.cmd_fail(`Command \`${cmd}\` is not found!`, `${prefix}play <MUSIC/URL>`), 5000);
              }
          } else {
              try {
                  command.run(bot, message, args);
              } catch (err) {
                  if (err) return undefined;
              }
          }
      });
  }

}