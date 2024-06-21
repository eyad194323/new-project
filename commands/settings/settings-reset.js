const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('settings-reset')
    .setDescription('اعادة تعيين الاعدادات'), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اعادة تعيين جميع الاعدادات**`)
        .setDescription(`**ملحوظة : اعادة التعيين تنطبق فقط على الاعدادت وليس النصابين والرومات الخاصة ..الخ**`)
        if(db.has(`unwords`)) {
                db.delete(`unwords`)
                db.set(`unwords` , [])
        }
        if(db.has(`open_message`)) {
                db.delete(`open_message`)
        }
        if(db.has(`close_message`)) {
                db.delete(`close_message`)
        }
        if(db.has(`close_time_hour`)) {
                db.delete(`close_time_hour`)
        }
        if(db.has(`close_time_min`)) {
                db.delete(`close_time_min`)
        }
        if(db.has(`open_time_hour`)) {
                db.delete(`open_time_hour`)
        }
        if(db.has(`open_time_min`)) {
                db.delete(`open_time_min`)
        }
        if(db.has(`designs_role_id`)) {
                db.delete(`designs_role_id`)
        }
        return interaction.reply({embeds:[embed1]})
}
}