const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField,MessageAttachment } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('اعطاء رتبة لشخص')
    .addStringOption(Option => 
        Option
        .setName('user')
        .setDescription('ايدي العضو')
        .setRequired(true))
      .addRoleOption(Option => Option
                    .setName(`role`)
                    .setDescription(`ايدي الرتبة`)
                    .setRequired(true))
  .addStringOption(Option => Option
                   .setName(`reason`)
    .setDescription(`السبب`)
                  .setRequired(true))
  .addAttachmentOption(Option =>  Option
    .setName(`prove`)
    .setDescription(`الدليل`)
    .setRequired(true)), // or false
async execute(interaction) {
 let allowedRoleID = "1105187624118923284"
          if (!interaction.member.roles.cache.some(role => role.id === allowedRoleID)) return;
  let user = interaction.options.getString(`user`)
  let role = interaction.options.getRole(`role`)
  let reason = interaction.options.getString(`reason`)
  let prove = interaction.options.getAttachment(`prove`)
  let prove2 = prove.proxyURL
  let provesroom = client.channels.cache.find(ch => ch.id == "1105187863869538334")
  let embed1 = new EmbedBuilder()
  .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
  .setTitle(`**تم اعطاء العضو رتبة بنجاح**`)
  let embed2 = new EmbedBuilder()
  .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
  .setTitle(`**تم اعطاء رتبة**`)
  .addFields(
    {
      name:`**الاداري المسئوول : **`,value:`**<@${interaction.user.id}>**`,inline:false
    },
    {
      name:`**العضو : **`,value:`**<@${user}>**`,inline:false
    },
    {
      name:`**الرتبة : **`,value:`**<@&${role}>**`,inline:false
    },
    {
      name:`**السبب : **`,value:`**${reason}**`,inline:false
    },
  )
  .setImage(prove2)
  client.channels.cache.get(`1105187863869538334`).send({embeds:[embed2]})
  let role2 = interaction.guild.roles.cache.find(r => r.id == role.id)
      let theuser = interaction.guild.members.cache.find(u => u.id == user)
    if (theuser) {
    await theuser.roles.add(role2);
  } else {
    return interaction.reply("Could not find user");
    }
  return interaction.reply({embeds:[embed1]})
}
}