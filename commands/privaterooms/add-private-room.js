const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-private-room')
    .setDescription('اضافة نوع روم خاص')
    .addStringOption(Option => 
        Option
        .setName('room')
        .setDescription('نوع الروم مثل 7 ايام')
        .setRequired(true))
        .addStringOption(Option => 
        Option
        .setName('price')
        .setDescription('سعر الروم')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        if(!db.has(`private_rooms`)) db.set(`private_rooms` , [])
        let private_rooms = db.get(`private_rooms`)
        let room = interaction.options.getString(`room`)
        let price = interaction.options.getString(`price`)
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
        .setTitle(`**هذا الروم متوفر بالفعل**`)
        if(private_rooms.includes(room)) return interaction.reply({embeds:[embed2]})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اضافة الروم بنجاح**`)
        .addFields({name:`**اسم الروم**`,value:`**\`${room}\`**`,inline:false},{name:`**سعر الروم**`,value:`**\`${price}\`**`,inline:false})
        db.push(`private_rooms` , room)
        db.set(`prv_${room}_price` , price)
        return interaction.reply({embeds:[embed3]})
}
}