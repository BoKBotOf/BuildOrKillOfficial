const fs = require('fs');
const discord = module.require("discord.js");
module.exports = (bot, utils, ytdl, config) => {

    


    let embed = new discord.RichEmbed()
            .setColor(0x00FFFF)
            .setDescription(`🎵 Вся музыка была окончена 🎵\n`)


    bot.handleVideo = async (video, message, vc, playlist = false) => {
        let queue = bot.queue.get(message.guild.id);
        let music = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            image: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
        };

        
        
        if (!queue) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: vc,
                connection: null,
                musics: [],
                volume: 100,
                playing: true
            };
            let voteConstruct = {
                votes: 0,
                voters: []
            };

            bot.queue.set(message.guild.id, queueConstruct);
            bot.votes.set(message.guild.id, voteConstruct)
            queueConstruct.musics.push(music);

            try {
                var connection = await vc.join();
                queueConstruct.connection = connection;
                bot.play(message.guild, queueConstruct.musics[0]);
            } catch (err) {
                bot.queue.delete(message.guild.id);
                console.error(`I could not join your voice channel: ${err}`);
            }
        }
        
        else {

            

            let embed1 = new discord.RichEmbed()
            .setColor(0x00FFFF)
            .setDescription(`🎵 [**__${music.title}__**](${music.url}) - была добавлена в очередь 🎵`)
            .setImage(`${music.image}`)


            queue.musics.push(music);
            if (playlist) return;
            
            else message.channel.send(embed1);

            
        }
        return;
    }

    bot.play = (guild, music) => {
        let queue = bot.queue.get(guild.id);
        let votes = bot.votes.get(guild.id)
        if (!music) {
            queue.voiceChannel.leave();
            bot.queue.delete(guild.id);
            bot.votes.delete(guild.id);
            return queue.textChannel.send(embed);
        }

        let embed1 = new discord.RichEmbed()
        .setColor(0x00FFFF)
        .setDescription(`Cейчас играет:\n[**__${music.title}__**](${(music.url)}) \nГромкость: **__${queue.volume}__**`)

        let dispatcher = queue.connection.playStream(ytdl(music.url))
            .on('end', () => {
                queue.musics.shift();
                votes.votes = 0;
                votes.voters = [];
                setTimeout(() => {
                    bot.play(guild, queue.musics[0]);
                }, 250);
            })
            .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        queue.textChannel.send(embed1);
    }

    
// Директории


// commands
fs.readdir("./commands/", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Загрузка ${jsfiles.length} команд...`);
    jsfiles.forEach((f, i) => {
        let props = require(`../commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


// modcmd
fs.readdir("./commands/modcmd", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Загрузка ${jsfiles.length} команд модерации...`);
    jsfiles.forEach((f, i) => {
        let props = require(`../commands/modcmd/${f}`);
        console.log(`${i + 1}: ${f} загружено!`);
        bot.commands.set(props.help.name, props);
    });
});


// funcmd
fs.readdir("./commands/funcmd", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Загрузка ${jsfiles.length} команд для фана...`);
    jsfiles.forEach((f, i) => {
        let props = require(`../commands/funcmd/${f}`);
        console.log(`${i + 1}: ${f} загружено!`);
        bot.commands.set(props.help.name, props);
    });
});


// muscmd
fs.readdir("./commands/muscmd", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Загрузка ${jsfiles.length} команд для музыки...`);
    jsfiles.forEach((f, i) => {
        let props = require(`../commands/muscmd/${f}`);
        console.log(`${i + 1}: ${f} загружено!`);
        bot.commands.set(props.help.name, props);
    });
});
    
// helpcmd
fs.readdir("./commands/helpcmd", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Загрузка ${jsfiles.length} команд для поддержки...`);
    jsfiles.forEach((f, i) => {
        let props = require(`../commands/helpcmd/${f}`);
        console.log(`${i + 1}: ${f} загружено!`);
        bot.commands.set(props.help.name, props);
    });
});



bot.loadCommand = (commandName) => {
    try {
        let props = require(`../commands/${commandName}`);
        if (props.init) props.init(bot);
        bot.commands.set(commandName, props);
        return false;
    } catch (err) {
        return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
    }
};

bot.unloadCommand = async (commandName) => {
    try {
        if (!commandName) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

        if (commandName.shutdown) await commandName.shutdown(bot);
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        return false;
    } catch (err) {
        return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
    }
};





}

