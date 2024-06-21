const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('اضافة الرتبة للبيع')
    .addStringOption(Option => 
        Option
        .setName('role')
        .setDescription('ايدي الرتبة')
        .setRequired(true))
        .addStringOption(Option => Option
                         .setName(`price`)
                         .setDescription(`سعر الرتبة`)
                         .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        if(!db.has(`shop_roles`)) db.set(`shop_roles` , ['123'])
        let shop_roles = db.get(`shop_roles`)
        let role = interaction.options.getString(`role`)
        let price = interaction.options.getString(`price`)
        let embed0 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء ادخال ايدي الرتبة بشكل صحيح**`)
        let rolee2 = interaction.guild.roles.cache.get(role)
        if(!rolee2) return interaction.reply({embeds:[embed0]})
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء ادخال السعر بشكل صحيح**`)
        if(isNaN(price)) return interaction.reply({embeds:[embed1]})
let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذه الرتبة متوفر بالفعل**`)
        if(shop_roles.includes(role)) return interaction.reply({embeds:[embed2]})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اضافة الرتبة بنجاح**`)
        .addFields({name:`**اسم الرتبة**`,value:`**<@&${role}>**`,inline:false},{name:`**سعر الرتبة**`,value:`**\`${price}\`**`,inline:false},{name:`**ايدي الرتبة**` , value:`**\`${role}\`**` , inline:false})
        db.push(`shop_roles` , role)
        db.set(`shop_${role}_price` , price)
        return interaction.reply({embeds:[embed3]})
}
}