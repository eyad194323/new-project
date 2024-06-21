const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('rooms')
    .setDescription('لرؤية الرومات الخاصة المتوفرة'),
async execute(interaction) {
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`** لا يوجد رومات خاصة متوفرة**`)
        let private_rooms = db.get(`private_rooms`)
        if(!private_rooms || private_rooms.length <= 0) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**انواع الرومات الخاصة المتوفرة**`)
        private_rooms.forEach((room) => {
                let prvroomprice = db.get(`prv_${room}_price`)
                embed2.addFields({name:`**----[${room}]----**`,value:`**-Price : \`${prvroomprice}\`**`,inline:false})
        })
        return interaction.reply({embeds:[embed2]})

}
}