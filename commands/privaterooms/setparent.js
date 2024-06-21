const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('setparent')
    .setDescription('تحديد كاتيجوري الرومات الخاصة')
    .addStringOption(Option => 
        Option
        .setName('category')
        .setDescription('ايدي الكاتيجوري')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let category = interaction.options.getString(`category`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم تحديد الكاتيجوري بنجاح**`)
        if(db.has(`private_category`)) db.delete(`private_category`);
        db.set(`private_category` , category)
        return interaction.reply({embeds:[embed1]})
}
}