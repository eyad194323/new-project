const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('coupouns')
    .setDescription('عرض الكوبونات المتوفرة'),
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let coupouns = db.get(`shop_coupouns`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        if(!coupouns || coupouns.length <= 0) {
                embed1.setTitle(`**لا يوجد كوبونات متوفرة**`)
        }else{
                embed1.setTitle(`**جميع الكوبونات المتوفرة**`)
                coupouns.forEach((coupoun) => {
                let percent = db.get(`_${coupoun}_percent`)
                let type = db.get(`_${coupoun}_type`)
                let maxuse = db.get(`_${coupoun}_maxuse`)
                        let current = db.get(`_${coupoun}_currentmaxuse`)
                embed1.addFields({name:`**-----**` , value:`**-Coupoun Name : \`${coupoun}\`\n-Max Use : \`${maxuse}\`\n-Percent When Use : \`${percent}\`\n-Coupoun Type : \`${type}\`\n-Current Uses : \`${current}\`**`})
        })
        }
       return interaction.reply({embeds:[embed1]});
}
}