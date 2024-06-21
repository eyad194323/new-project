const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField,MessageAttachment  } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-scammer')
    .setDescription('اضافة نصاب')
    .addStringOption(Option => 
        Option
        .setName('scammer')
        .setDescription('ايدي الشخص النصاب')
        .setRequired(true))
            .addStringOption(Option => Option
                            .setName(`story`)
                            .setDescription(`قصة النصاب`)
                            .setRequired(true))
        .addAttachmentOption(Option => Option
                        .setName(`prove1`)
                      .setDescription(`الدليل الاول`)
                      .setRequired(true))
        .addAttachmentOption(Option => Option
                .setName(`prove2`)
                      .setDescription(`الدليل الثاني`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove3`)
                      .setDescription(`الدليل الثالث`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove4`)
                      .setDescription(`الدليل الرابع`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove5`)
                      .setDescription(`الدليل الخامس`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove6`)
                      .setDescription(`الدليل السادس`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove7`)
                      .setDescription(`الدليل السابع`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove8`)
                      .setDescription(`الدليل الثامن`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove9`)
                      .setDescription(`الدليل التاسع`)
                      .setRequired(false))
        .addAttachmentOption(Option => Option
                .setName(`prove10`)
                      .setDescription(`الدليل العاشر`)
                      .setRequired(false)), // or false
async execute(interaction) {
          let allowedRoleID = "1105187624118923284"
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
        let story = interaction.options.getString(`story`)
        let prove1 = interaction.options.getAttachment(`prove1`)
        let prove2 = interaction.options.getAttachment(`prove2`)
        let prove3 = interaction.options.getAttachment(`prove3`)
        let prove4 = interaction.options.getAttachment(`prove4`)
        let prove5 = interaction.options.getAttachment(`prove5`)
        let prove6 = interaction.options.getAttachment(`prove6`)
        let prove7 = interaction.options.getAttachment(`prove7`)
        let prove8 = interaction.options.getAttachment(`prove8`)
        let prove9 = interaction.options.getAttachment(`prove9`)
        let prove10 = interaction.options.getAttachment(`prove10`)
        let proves = []
        if(prove1) proves.push(prove1.proxyURL)
        if(prove2) proves.push(prove2.proxyURL)
        if(prove3) proves.push(prove3.proxyURL)
        if(prove4) proves.push(prove4.proxyURL)
        if(prove5) proves.push(prove5.proxyURL)
        if(prove6) proves.push(prove6.proxyURL)
        if(prove7) proves.push(prove7.proxyURL)
        if(prove8) proves.push(prove8.proxyURL)
        if(prove9) proves.push(prove9.proxyURL)
        if(prove10) proves.push(prove10.proxyURL)
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الشخص موجود في قائمة النصابين بالفعل**`)
        if(db.has(`${scammer1}_scammer`)) return interaction.reply({embeds:[embed2]})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اضافة المتهم الي قائمة النصابين بنجاح**`)
        .addFields(
                {
                        name:`**المتهم**` , value:`**<@${scammer1}>**`,inline:true
                },
                   {
                           name:`**القصة**`,value:`**${story}**`,inline:true
                   },
                   {
                           name:`**الادلة**`,value:`** الادلة علي هيئة روابط**`,inline:true
                   }
        )
        proves.forEach((provee) => {
                embed3.addFields({name:`**===**` , value:`${provee}` , inline:false})
        })
        db.set(`${scammer1}_scammer` , true)
        db.set(`${scammer1}_story` , story)
        db.set(`${scammer1}_proves` , proves)
  let scamrole = interaction.roles.cache.get(1105187700660785162)
  let thescammer = await client.users.fetch(scammer1).catch()
  thescammer.roles.add(scamrole)
        interaction.reply({embeds:[embed3]})
}
}