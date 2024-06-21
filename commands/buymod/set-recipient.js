const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-recipient')
    .setDescription('تحديد مستلم الارباح')
    .addUserOption(Option => 
        Option
        .setName('user')
        .setDescription('منشن مستلم الارباح')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let user = interaction.options.getUser(`user`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم تحديد مستلم الارباح بنجاح**`)
        if(db.has(`recipient`)) db.delete(`recipient`);
        db.set(`recipient` , user.id)
        return interaction.reply({embeds:[embed1]})

}
}