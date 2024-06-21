const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('removecoupoun')
    .setDescription('ازالة كوبون خصم')
    .addStringOption(Option => 
        Option
        .setName('coupoun')
        .setDescription('الكوبون المراد ازالته')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let coupoun = interaction.options.getString(`coupoun`)
        let coupouns = db.get(`shop_coupouns`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الكوبون غير متوفر للازالة**`)
        if(!coupouns.includes(coupoun)) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة الكوبون بنجاح**`)
        let filtered = coupouns.filter(co => co !== coupoun)
        db.set(`shop_coupouns` , filtered)
        db.delete(`_${coupoun}_maxuse`)
        db.delete(`_${coupoun}_percent`)
        db.delete(`_${coupoun}_type`)
        db.delete(`_${coupoun}_currentmaxuse`)
        return interaction.reply({embeds:[embed2]})
}
}