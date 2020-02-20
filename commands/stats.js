const fetch = require('node-fetch');
const RichEmbed = require('discord.js');

module.exports = {
	name: 'Stats',
    description: 'Get MRoyale stats',
    args: true,
	execute(message, args) {
        if (!args.length) return message.reply('please specify a username.');
        if (args.length > 1) return message.reply('too many arguments');
            fetch(`https://mroyale.cyuubi.xyz/api/account?username=${args[0]}`)
            .then(res => res.json())
            .then(json => {
                var Banned = "No";
                if (json.isBanned == 1){
                  Banned = "Yes"
                }
                var sqd = "No Squad Code";
                if (json.squad != "") {
                  sqd = json.squad;
                }
                const embed = new RichEmbed.RichEmbed()
                  .setTitle(`Stats for ${args[0]}`)
                  .setColor(0xcc5506)
                  .addField("Nickname", json.nickname, true)
                  .addField("Squad code", sqd, true)
                  .addField("Coins", json.coins, true)
                  .addField("Wins", json.wins, true)
                  .addField("Deaths", json.deaths, true)
                  .addField("Kills", json.kills, true)
                  .addField("Banned", Banned, true)
                  .setThumbnail(`https://raw.githubusercontent.com/ddmilburn02/mroyale_skins/master/${json.skin}.png`)
                  .setFooter("MRoyale Bot");
                message.channel.send(embed);
            })
	},
};