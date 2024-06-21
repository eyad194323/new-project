const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('setads-room')
    .setDescription('تحديد روم وصول الاعلانات')
    .addStringOption(Option => 
        Option
        .setName('room')
        .setDescription('ايدي روم وصول الاعلانات')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let room1 = interaction.options.getString(`room`)
        let room2 = interaction.guild.channels.cache.get(room1)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء تحديد ايدي روم صحيح**`)
        if(!room2) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**تم تحديد روم وصول الاعلانات الي : ${room2}**`)
        if(db.has(`ads_room`)) db.delete(`ads_room`)
        db.set(`ads_room` , room1)
        return interaction.reply({embeds:[embed2]})
}
}