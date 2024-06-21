const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove-scammer')
    .setDescription('ازالة شخص من قائمة النصابين')
    .addStringOption(Option => 
        Option
        .setName('scammer')
        .setDescription('ايدي النصاب المراد ازالته')
        .setRequired(true)), // or false
async execute(interaction) {
              let allowedRoleID = "1027565747595124767"
          if (!interaction.member.roles.cache.some(role => role.id === allowedRoleID)) return;
        let scammer1 = interaction.options.getString(`scammer`)
        let scammer2 = await client.users.fetch(scammer1).catch()
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء وضع ايدي شخص صالح**`)
        if(!scammer2) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الشخص غير موجود في قائمة النصابين**`)
        if(!db.has(`${scammer1}_scammer`)) return interaction.reply({embeds:[embed2]})
        db.delete(`${scammer1}_scammer`)
        db.delete(`${scammer1}_story`)
        db.delete(`${scammer1}_proves`)
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة المتهم بنجاح**`)
  let scamrole = interaction.roles.cache.get(1027565817161863268)
  let thescammer = await client.users.fetch(scammer1).catch()
  thescammer.roles.add(scamrole)
        return interaction.reply({embeds:[embed3]})
}
}