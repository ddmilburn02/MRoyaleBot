const Discord = require('discord.js');

module.exports = {
	name: 'desktop',
	description: 'Provides the MRoyale Desktop link.',
	execute(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle("Here's the MRoyale Desktop link!")
            .setColor(0xcc5506)
            .setDescription("Click [here](https://github.com/mroyale/marioroyaledesktop/releases) to get the (current) Desktop Client!")
            .setThumbnail("https://cdn.discordapp.com/attachments/504028063948865536/645702802147901454/e7fab1e75ccfeb1484df5f1ec76c6796.gif")
            .setFooter("MRoyale Bot");
        message.channel.send(embed);
	},
};