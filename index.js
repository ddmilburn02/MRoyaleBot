const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const client = new Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
const config = require("./config.json");
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('I am ready!');
    client.user.setActivity('dd test me', {type: 'WATCHING'});
});
client.login(config.token);
client.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find(ch => ch.id == '672229426272010285');
    const embed = new RichEmbed()
      .setTitle(`Welcome, ${member.user.username}!`)
      .setDescription(`We now have ${member.guild.memberCount} members!`)
      .setThumbnail(member.user.avatarURL)
      .setTimestamp(Date.now());
    channel.send(embed);
});
client.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});