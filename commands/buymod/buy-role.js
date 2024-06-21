const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('buy-role')
    .setDescription('شراء رتبة')
    .addStringOption(Option => 
        Option
        .setName('role')
        .setDescription('ايدي الرتبة')
        .setRequired(true)), // or false
async execute(interaction) {
        let role = interaction.options.getString(`role`)
        let roles = db.get(`shop_roles`)
let embed0 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**لديك عملية شراء \nللالغاء : \`\`\`/end\`\`\`**`)
        if(db.has(`${interaction.user.id}_buying`)) return interaction.reply({embeds:[embed0]})
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذه الرتبة غير متوفرة للبيع\nالرتب المتوفرة : **`)
        if(!roles || roles.length <= 0) {
                embed1.setDescription(`**لا يوجد رتب متوفرة للبيع**`)
        }else{
                roles.forEach((rolee) => {
                        let roleprice = db.get(`shop_${rolee}_price`)
                let roleM = interaction.guild.roles.cache.get(rolee);
                embed1.addFields({name:`**--------**`,value:`**-Role : ${roleM}\n-Price : \`${roleprice}\`\n-ID : ${rolee}**`,inline:false})
                })
                if(!roles.includes(role)) return interaction.reply({embeds:[embed1]})
                let coupouns = db.get(`shop_coupouns`)
                let roleprice = db.get(`shop_${role}_price`)
        coupouns.forEach((coupoun) => {
                let co =db.get(`_${coupoun}_type`)
                if(db.has(`${coupoun}_${interaction.user.id}_used`)&&!db.has(`${coupoun}_${interaction.user.id}_bought`) && co == "roles") roleprice = Math.floor(roleprice - db.get(`_${coupoun}_percent`) * (db.get(`shop_${role}_price`) / (100)))
          let thecoupounused = coupoun
        });
                let recipient = db.get(`recipient`)
        let tax1 = Math.floor((roleprice) * (20) / (19) + 1)
                let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**قم بتحويل \`${tax1}\` الى <@${recipient}>\n\`\`\`#credit ${recipient} ${tax1} رتبة\`\`\`**لديك 5 دقائق للتحويل`)
                let a = await interaction.reply({embeds:[embed2],content: `#credit ${recipient} ${tax1} رتبة`})
                const filter = i => ((i.author.id == "282859044593598464" || i.author.id === "567703512763334685") && (i.content.includes(roleprice)) && (i.content.includes(`<@${recipient}>`) || i.content.includes(recipient)) && i.content.includes(interaction.user.username) )
        const collector = interaction.channel.createMessageCollector({
    filter,
    max: 1, // maximum number of components to collect
    time: 1000 * 60 * 5 // time to wait for a component (in milliseconds)
});
                db.set(`${interaction.user.id}_buying`, true)
                collector.once('collect' , async() => {
                        if(!db.has(`${interaction.user.id}_buying`)) return;
                db.delete(`${interaction.user.id}_buying`)
                        let therole = interaction.guild.roles.cache.get(role)
                        let embed3 = new EmbedBuilder()
                        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                        .setTitle(`**تم شراء الرتبة بنجاح**`)
                        interaction.member.roles.add(therole)
                        return interaction.channel.send({embeds:[embed3] , content:`<@${interaction.user.id}>`})
                })
                 collector.on('end' , collected => {
                if(!db.has(`${interaction.user.id}_buying`)) return;
                let embed8 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**انتهى وقت العملية**`)
                 return interaction.channel.send({embeds:[embed8] , content:`<@${interaction.user.id}>`})
        })
        }   
}
}