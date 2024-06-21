const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-programming')
    .setDescription('تعيين روم وصول طلبات البرمجيات او رول منشن الطلب')
    .addStringOption(Option => 
        Option
        .setName('thing')
        .setDescription('Room Or Role')
            .addChoices(
            { name: 'room', value: 'room' },
            { name: 'role', value: 'role' },)
            
        .setRequired(true))
        .addStringOption(Option => Option
                         .setName(`id`)
                         .setDescription(`room or role id`)
                         .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let thing = interaction.options.getString(`thing`)
        let id = interaction.options.getString(`id`)
        if(thing == "room"){
                let roomid = interaction.guild.channels.cache.get(id)
                let embed1 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**الرجاء كتابة ايدي الروم بشكل صحيح**`)
                if(!roomid) return interaction.reply({embeds:[embed1]})
                let embed2 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**تم تحديد <#${id}> روم لطلبات البرمجيات**`)
                if(db.has(`programming_${thing}_id`)) db.delete(`programming_${thing}_id`)
                db.set(`programming_${thing}_id` , id)
                return interaction.reply({embeds:[embed2]})
        }
        if(thing == 'role') {
                 let roleid = interaction.guild.roles.cache.get(id)
                let embed2 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**الرجاء كتابة ايدي الرول بشكل صحيح**`)
                if(!roleid) return interaction.reply({embeds:[embed2]})
                let embed3 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setDescription(`**تم تحديد <@&${id}> رول منشن طلبات البرمجيات**`)
                if(db.has(`programming_${thing}_id`)) db.delete(`programming_${thing}_id`)
                db.set(`programming_${thing}_id` , id)
                return interaction.reply({embeds:[embed3]});
        }
}
}  