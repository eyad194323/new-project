const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warns')
    .setDescription('عرض التحذيرات التي اعطاها الاداري')
    .addStringOption(Option => 
        Option
        .setName('user')
        .setDescription('ايدي الاداري')
        .setRequired(true)), // or false
async execute(interaction) {
    let user1 = interaction.options.getString(`user`)
        let user2 = await client.users.fetch(user1).catch()
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء وضع ايدي شخص صالح**`)
        if(!user2) return interaction.reply({embeds:[embed1]})
        let warnscount = db.get(`${interaction.user.id}__warnscount`) || 0;
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**عدد التحذيرات التي اعطاها : <@${user1}> : \`${warnscount}\`**`)
        if(!db.has(`${interaction.user.id}_warnscount`)) db.set(`${interaction.user.id}_warnscount` , 0);
        return interaction.reply({embeds:[embed2]})
}
}