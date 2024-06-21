const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('applycoupoun')
    .setDescription('استعمال كوبون خصم')
    .addStringOption(Option => 
        Option
        .setName('coupoun')
        .setDescription('كوبون الخصم')
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let coupoun = interaction.options.getString(`coupoun`)
        let coupouns = db.get(`shop_coupouns`)
        if(!db.has(`shop_coupouns`)) db.set(`shop_coupouns` , [])
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الكوبون خطأ او غير صالح للاستخدام**`)
        if(!coupouns.includes(coupoun)) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**لقد قمت باستعمال هذا الكوبون مسبقا**`)
        if(db.has(`${coupoun}_${interaction.user.id}_used`) || db.has(`${coupoun}_${interaction.user.id}_bought`)) return interaction.reply({embeds:[embed2]})
        let maxuse = db.get(`_${coupoun}_maxuse`)
        let percent = db.get(`_${coupoun}_percent`)
        let current = db.get(`_${coupoun}_currentmaxuse`)
        let type = db.get(`_${coupoun}_type`)
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الكود وصل للحد الاقصى للاستخدامات**`)
        if(current == maxuse) return interaction.reply({embeds:[embed3]});
        let embed4 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم استعمال الكوبون بنجاح**`)
        .addFields({name:`**الكوبون : **`,value:`**\`${coupoun}\`**`,inline:false},{name:`**نسبة الخصم : **`,value:`**\`${percent}\`**`,inline:false},{name:`**الكوبون صالح للاستخدام في : **`,value:`**\`${type}\`**`,inline:false})
        db.set(`${coupoun}_${interaction.user.id}_used` , true)
        let newmaxuse = Math.floor(current + 1)
        db.delete(`_${coupoun}_currentmaxuse`)
        db.set(`_${coupoun}_currentmaxuse` , newmaxuse)
        return interaction.reply({embeds:[embed4]})
}
}