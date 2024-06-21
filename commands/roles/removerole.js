const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('ازالة رتبة من البيع')
    .addStringOption(Option => 
        Option
        .setName('role')
        .setDescription('ايدي الرتبة')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
if(!db.has(`shop_roles`)) db.set(`shop_roles` , ['123'])
        let shop_roles = db.get(`shop_roles`)
        let role = interaction.options.getString(`role`)
                let embed0 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء ادخال ايدي الرتبة بشكل صحيح**`)
        let rolee2 = interaction.guild.roles.cache.get(role)
        if(!rolee2) return interaction.reply({embeds:[embed0]})
         let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذه الرتبة غير متوفر للازالة**`)
        if(!shop_roles.includes(role)) return interaction.reply({embeds:[embed2]})
         let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة الرتبة بنجاح**`)
        let filtered = shop_roles.filter(roo => roo !== role)
        db.set(`shop_roles` , filtered)
        db.delete(`shop_${role}_price`)
        return interaction.reply({embeds:[embed3]})
}
}