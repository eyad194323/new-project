const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('لرؤية الرتب المتوفرة للبيع'),
async execute(interaction) {
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`** لا يوجد رتب متوفرة**`)
        let shop_roles = db.get(`shop_roles`)
        if(!shop_roles || shop_roles.length <= 0) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**انواع الرتب المتوفرة**`)
         let shop_roles2 = shop_roles.filter(a => a!= shop_roles[0])
        shop_roles2.forEach((rolee) => {
                let roleprice = db.get(`shop_${rolee}_price`)
                let roleM = interaction.guild.roles.cache.get(rolee);
                embed2.addFields({name:`**--------**`,value:`**-Role : ${roleM}\n-Price : \`${roleprice}\`\n-ID : ${rolee}**`,inline:false})
        })
        return interaction.reply({embeds:[embed2]})

}
}