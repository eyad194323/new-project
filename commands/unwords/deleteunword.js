const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('deleteunword')
    .setDescription('ازالة كلمة ممنوعة')
    .addStringOption(Option => 
        Option
        .setName('word')
        .setDescription('الكلمة')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let word = interaction.options.getString(`word`)
        let unwords = db.get(`unwords`)
        if(!db.has(`unwords`)) db.set(`unwords` , [])
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذه الكلمة موجودة غير موجودة للازالة**`)
        if(!unwords.includes(word)) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة الكمة من الكلمات الممنوعة**`)
        let filtered = unwords.filter(wo => wo !== word)
        db.set(`unwords` , filtered)
        return interaction.reply({embeds:[embed2]})
}
}