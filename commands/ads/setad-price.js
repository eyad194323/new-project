const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('setad-price')
    .setDescription('تحديد سعر الاعلانات')
    .addStringOption(Option => 
        Option
        .setName('adtype')
        .setDescription('نوع الاعلان')
            .addChoices({name:`here` , value:`here`} , {name:`everyone` , value:`everyone`})
        .setRequired(true))
        .addStringOption(Option => Option
                        .setName(`price`)
        .setDescription(`سعر الاعلان`)
                        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let price = interaction.options.getString(`price`)
        let adtype = interaction.options.getString(`adtype`)
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
        .setTitle(`**تم تحديد السعر بنجاح**`)
        .addFields({name:`**نوع الاعلان**` , value:`**\`${adtype}\`**`} , {name:`**سعر الاعلان**` , value:`**\`${price}\`**`})
        if(db.has(`ads_${adtype}_price`)) db.delete(`ads_${adtype}_price`)
        db.set(`ads_${adtype}_price` , price)
        return interaction.reply({embeds:[embed2]})
}
}