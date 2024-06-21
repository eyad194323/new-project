const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('buy-post')
    .setDescription('شراء منشور')
    .addStringOption(Option => 
        Option
        .setName('type')
        .setDescription('نوع المنشور')
            .addChoices({name:`here` , value:`here`} , {name:`everyone` , value:`everyone`})
        .setRequired(true))
        .addStringOption(Option => Option
                        .setName(`post`)
                        .setDescription(`رسالة المنشور`)
                        .setRequired(true)), // or false
async execute(interaction) {
        let type = interaction.options.getString(`type`)
        let post = interaction.options.getString(`post`)
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
        .setTitle(`**لم يتم تحديد روم المنشورات**`)
        if(!db.has(`posts_room`)) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء عدم وضع اي منشن في المنشور سيتم وضعه تلقائيا**`)
        if(post !== null&&(post.includes(`@here`) || post.includes('@everyone'))) return interaction.reply({embeds:[embed2]})
        let coupouns = db.get(`shop_coupouns`)
        let adprice = db.get(`post_${type}_price`)
        let recipient = db.get(`recipient`)
        coupouns.forEach((coupoun) => {
                let co =db.get(`_${coupoun}_type`)
                if(db.has(`${coupoun}_${interaction.user.id}_used`) && !db.has(`${coupoun}_${interaction.user.id}_bought`) && co == "posts") adprice = Math.floor(adprice - db.get(`_${coupoun}_percent`) * (db.get(`post_${type}_price`) / (100)))
          let thecoupounused = coupoun
        });
  
                let adsroom = db.get(`posts_room`)
                let tax1 = Math.floor((adprice) * (20) / (19) + 1)
                 let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**قم بتحويل \`${tax1}\` الى <@${recipient}>\n\`\`\`#credit ${recipient} ${tax1} منشور\`\`\`**لديك 5 دقائق للتحويل`)
        db.set(`${interaction.user.id}_buying` , true)
                let a = await interaction.reply({embeds:[embed3],content: `#credit ${recipient} ${tax1} منشور`})
                        const filter = i => ((i.author.id == "282859044593598464" || i.author.id === "567703512763334685") && (i.content.includes(adprice)) && (i.content.includes(`<@${recipient}>`) || i.content.includes(recipient)) && i.content.includes(interaction.user.username) )
        const collector = interaction.channel.createMessageCollector({
    filter,
    max: 1, // maximum number of components to collect
    time: 1000 * 60 * 5 // time to wait for a component (in milliseconds)
});
        db.set(`${interaction.user.id}_buying`, true)
        collector.once(`collect` , async() => {
                if(!db.has(`${interaction.user.id}_buying`)) return;
                db.delete(`${interaction.user.id}_buying`)
                let embed4 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**تم شراء المنشور بنجاح**`)
                client.channels.cache.get(adsroom).send({content:`${post}\nتواصلو مع <@${interaction.user.id}> \n@${type}`})
client.channels.cache.get(adsroom).send({content:`**منشور مدفوع نخلي مسؤوليتنا من اي شي يصير بينكم \n\nلطلب مثله حياك <#1105187825814610001>**`})
client.channels.cache.get(adsroom).send({files: ["https://media.discordapp.net/attachments/1105187800833335416/1120239828458557440/Picsart_23-05-22_11-29-28-389.png?width=1200&height=133"]})
                return interaction.channel.send({embeds:[embed4] , content:`<@${interaction.user.id}>`})
        })
        collector.on('end' , collected => {
                if(!db.has(`${interaction.user.id}_buying`)) return;
                let embed5 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**انتهى وقت العملية**`)
                return interaction.channel.send({embeds:[embed5] , content:`<@${interaction.user.id}>`})
        })
        
}
}