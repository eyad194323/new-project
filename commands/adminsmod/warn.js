const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('اعطاء لشخص تحذير')
    .addStringOption(Option => 
        Option
        .setName('user')
        .setDescription('ايدي الشخص المراد اعطائه التحذير')
        .setRequired(true))
        .addStringOption(Option => Option 
                        .setName(`warn`)
                        .setDescription(`سبب التحذير`)
                        .setRequired(true))
        .addAttachmentOption(Option => Option 
                        .setName(`prove`)
                        .setDescription(`الدليل`)
                        .setRequired(true)),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let user = interaction.options.getString(`user`)
        let warn = interaction.options.getString(`warn`)
        let prove = interaction.options.getAttachment(`prove`)
        let user2 = await client.users.fetch(user).catch()
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء وضع ايدي شخص صالح**`)
        if(!user2) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اعطاء العضو تحذير بنجاح**`)
        .addFields(
                {
                        name:`**العضو : **`,value:`**<@${user}>**`,inline:false
                },
                {
                name:`**سبب التحذير :**`,value:`**\`${warn}\`**`,inline:false
                        
                },
        )
        .setImage(prove.proxyURL)
        
         if(!db.has(`${interaction.user.id}_warnscount`)) db.set(`${interaction.user.id}_warnscount` , 0);
      let warnscount = db.get(`${interaction.user.id}_warnscount`)
      let newwarnscount = Math.floor(parseInt(warnscount) + 1)
      db.delete(`${interaction.user.id}_warnscount`)
      db.set(`${interaction.user.id}_warnscount` , newwarnscount)
        return interaction.reply({embeds:[embed2]})
        
}
}