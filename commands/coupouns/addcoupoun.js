const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('addcoupoun')
    .setDescription('اضافة كوبون خصم')
    .addStringOption(Option => 
        Option
        .setName('coupoun')
        .setDescription('الكوبون')
        .setRequired(true))
        .addStringOption(Option => 
        Option
        .setName('maxuse')
        .setDescription('اقصى عدد للاستخدام')
        .setRequired(true))
        .addStringOption(Option => 
        Option
        .setName('percent')
        .setDescription('نسبة الخصم عند استخدام الكوبون')
        .setRequired(true))
        .addStringOption(Option => 
        Option
        .setName('type')
        .setDescription('تطبيق الخصم علي')
                .addChoices({name:`ads` , value:`ads`} , {name:`posts` , value:`posts`} , {name:`roles` , value:`roles`} , {name:`privaterooms` , value:`privaterooms`})
        .setRequired(true)), // or false
async execute(interaction) {
    if (!owner.includes(interaction.user.id)) return;
        let coupoun = interaction.options.getString(`coupoun`)
        let maxuse = interaction.options.getString(`maxuse`)
        let percent = interaction.options.getString(`percent`)
        let type = interaction.options.getString(`type`)
        let coupouns = db.get(`shop_coupouns`)
        if(!db.has(`shop_coupouns`)) db.set(`shop_coupouns` , [])
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الكوبون متوفر بالفعل**`)
        if(coupouns.includes(coupoun)) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء ادخال اقصى عدد للاستخدام بشكل صحيح**`)
        if(isNaN(maxuse)) return interaction.reply({embeds:embed2})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء ادخال نسبة الخصم بشكل صحيح**`)
        if(isNaN(percent)) return interaction.reply({embeds:[embed3]})
        let embed4 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم اضافة الكوبون بنجاح**`)
        .setDescription(`**\`معلومات الكوبون\`**`)
        .addFields(
                {
                        name:`**الكوبون : **`,value:`**\`${coupoun}\`**`,inline:false
                },
                {
                        name:`**تم تطبيق الخصم علي : **`,value:`**\`${type}\`**`,inline:false
                },
                {
                        name:`**اقصى عدد للاستخدام : **`,value:`**\`${maxuse}\`**`,inline:false
                },
                {
                        name:`**نسبة الخصم عند استخدام الكوبون : **`,value:`**\`${percent}%\`**`,inline:false
                },
        )
        db.push(`shop_coupouns` , coupoun)
        db.set(`_${coupoun}_maxuse` , maxuse)
        db.set(`_${coupoun}_percent` , percent)
        db.set(`_${coupoun}_type` , type)
        db.set(`_${coupoun}_currentmaxuse` , 0)
        return interaction.reply({embeds:[embed4]})
        

}
}