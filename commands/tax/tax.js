const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('tax')
    .setDescription('لمعرفة ضريبة رقم')
    .addStringOption(Option => 
        Option
        .setName('number')
        .setDescription('العدد المراد معرفة ضريبته')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let number = interaction.options.getString(`number`)
        if(number.endsWith("k")) number = number.replace(/k/gi, "") * 1000;
  else if(number.endsWith("K")) number = number.replace(/K/gi, "") * 1000;
        else if(number.endsWith("m")) number = number.replace(/m/gi, "") * 1000000;
      else if(number.endsWith("M")) number = number.replace(/M/gi, "") * 1000000;
         let number2 = parseInt(number)
        let tax = Math.floor(number2 * (20) / (19) + 1) // المبلغ مع الضريبة
        let tax2 = Math.floor(tax - number2) // الضريبة
        let tax3 = Math.floor(tax * (20) / (19) + 1) // المبلغ مع ضريبة الوسيط
        let tax4 = Math.floor(tax3 - tax) // ضريبة الوسيط
 let embed1 = new EmbedBuilder()
.setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .addFields([
            {
                name:`**المبلغ**` , value:`**\`${number2}\`**` , inline:true
            },
            {
                name:`**المبلغ مع الضريبة**` , value:`**\`${tax}\`**` , inline:true
            },
            {
                name:`**المبلغ مع ضريبة الوسيط**` , value:`**\`${tax3}\`**` , inline:false
            },
            {
                name:`**الضريبة**` , value:`**\`${tax2}\`**` , inline:true
            },
            {
                name:`**ضريبة الوسيط**` , value:`**\`${tax4}\`**` , inline:true
            }
        ])
        return interaction.reply({embeds:[embed1]})
}
}