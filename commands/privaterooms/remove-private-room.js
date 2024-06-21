const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove-private-room')
    .setDescription('ازالة نوع روم خاص')
    .addStringOption(Option => 
        Option
        .setName('room')
        .setDescription('نوع الروم مثل 7 ايام')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        if(!db.has(`private_rooms`)) db.set(`private_rooms` , [])
        let private_rooms = db.get(`private_rooms`)
        let room = interaction.options.getString(`room`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم حذف جميع انواع الرومات**`)
        if(room === "all" || room === "ALL" || room === "All"){
                db.delete(`private_rooms`)
                db.set(`private_rooms` , [])
                return interaction.reply({embeds:[embed1]})
        }
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الروم غير متوفر للازالة**`)
        if(!private_rooms.includes(room)) return interaction.reply({embeds:[embed2]})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة الروم بنجاح**`)
        let filtered = private_rooms.filter(roo => roo !== room)
        db.set(`private_rooms` , filtered)
        db.delete(`prv_${room}_price`)
        return interaction.reply({embeds:[embed3]})
}
}