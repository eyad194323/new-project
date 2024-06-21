const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('proves')
    .setDescription('لرؤية ادلة النصاب')
    .addStringOption(Option => 
        Option
        .setName('user')
        .setDescription('النصاب المراد رؤية ادلته')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
 let scammer1 = interaction.options.getString(`user`)
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
        .setTitle(`**لم يتم العثور علي هذا الشخص في قائمة النصابين لرؤية الادلة**`)
        if(!db.has(`${scammer1}_scammer`)) return interaction.reply({embeds:[embed2]})
        let scammerstory = db.get(`${scammer1}_story`)
        let scammerproves = db.get(`${scammer1}_proves`)
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**قصة وادلة الشخص النصاب**`)
        .addFields({name:`**قصة التهمة**`,value:`**\`${scammerstory}\`**`,inline:false},{name:`**الادلة**`,value:`**الادلة مدرجة علي هيئة روابط**`,inline:false})
        
        scammerproves.forEach((prove) => {
                embed3.addFields({name:`**===**`,value:`${prove}`,inline:false})
        })
        interaction.reply({embeds:[embed3]})
}
}