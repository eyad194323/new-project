const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField , ApplicationCommandOptionType , collection } = require("discord.js");
const ms = require('ms')
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('buy-room')
    .setDescription('لشراء روم خاص')
    .addStringOption(Option => 
        Option
        .setName('room')
        .setDescription('نوع الروم المراد شرائه')
        .setRequired(true)), // or false
async execute(interaction) {
        let room = interaction.options.getString(`room`)
        let coupouns = db.get(`shop_coupouns`)
        let roomprice = db.get(`prv_${room}_price`)
        let discount = coupouns.forEach((coupoun) => {
                let co =db.get(`_${coupoun}_type`)
                if(db.has(`${coupoun}_${interaction.user.id}_used`) &&!db.has(`${coupoun}_${interaction.user.id}_bought`)&& co == "privaterooms") roomprice = Math.floor(roomprice - db.get(`_${coupoun}_percent`) * (db.get(`prv_${room}_price`) / (100)))
          let thecoupounused = coupoun
        })
        let rooms = db.get(`private_rooms`)
        let recipient = db.get(`recipient`)
        let category = db.get(`private_category`)
        let tax1 = Math.floor((roomprice) * (20) / (19) + (1))
        let pareent = db.get(`private_category`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا النوع من الرومات غير متوفر , الانواع المتوفرة : **`)
        if(!db.has(`private_rooms`) || rooms.length <= 0) {
                embed1.setDescription(`**لا يوجد انواع متوفرة**`)
        }else {
                rooms.forEach((roomm) => {
                        let prvroomprice = db.get(`prv_${roomm}_price`)
                        embed1.addFields({name:`**----[${roomm}]----**`,value:`**-Price : \`${prvroomprice}\`**`,inline:false})
                })
        }
        if(!rooms.includes(room)) return interaction.reply({embeds:[embed1]})
        let embed0 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**لديك عملية شراء \nللالغاء : \`\`\`/end\`\`\`**`)
        if(db.has(`${interaction.user.id}_buying`)) return interaction.reply({embeds:[embed0]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**لم يتم تحديد مستلم الارباح**`)
        if(!db.has(`recipient`)) return interaction.reply({embeds:[embed2]})
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**لم يتم تحديد كاتيجوري الرومات الخاصة**`)
        if(!db.has(`private_category`)) return interaction.reply({embeds:[embed3]})
        let embed4 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setDescription(`**قم بتحويل \`${tax1}\` الى <@${recipient}>\n\`\`\`#credit ${recipient} ${tax1} روم خاص\`\`\`**لديك 5 دقائق للتحويل`)
        db.set(`${interaction.user.id}_buying` , true)
        let a = await interaction.reply({embeds:[embed4], conte: `#credit ${recipient} ${tax1} روم خاص`})
        const filter = i => ((i.author.id == "282859044593598464" || i.author.id === "282859044593598464") && (i.content.includes(roomprice)) && (i.content.includes(`<@${recipient}>`) || i.content.includes(recipient)) && i.content.includes(interaction.user.username) )
        const collector = interaction.channel.createMessageCollector({
    filter,
    max: 1, // maximum number of components to collect
    time: 1000 * 60 * 5 // time to wait for a component (in milliseconds)
});
        collector.once(`collect` , async() => {
                if(!db.has(`${interaction.user.id}_buying`)) return;
                db.delete(`${interaction.user.id}_buying`)
                let evero = interaction.guild.roles.cache.find(roless => roless.name === "@everyone")
                let channell = await interaction.guild.channels.create({
          name:`♘・${interaction.user.username}`,
          parent:`${pareent}`,
          permissionOverwrites:[
            {
              id:evero,
              deny:PermissionsBitField.Flags.SendMessages
            },
            {
              id:interaction.user.id,
              allow:PermissionsBitField.Flags.SendMessages
            }
          ]
        })
                const date = new Date()
                let bydate = ms(room)
                let bydate2 = bydate / (24 * 60 * 60 * 1000)
                let createin = (date.getMonth()) + '/' + date.getDate() + '/' + date.getFullYear();
let endsin = new Date(date.getTime() + bydate);
let endsin2 = (endsin.getMonth()) + '/' + endsin.getDate() + '/' + endsin.getFullYear();
                let roomdet = Math.floor((Date.now() + ms(room)) / 1000)
                let embed5 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setDescription(`**تم انشاء رومك بنجاح\nرومك هو : ${channell}**`)
              interaction.channel.send({embeds:[embed5] , content:`<@${interaction.user.id}>` })
                let embed6 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .addFields({name:`**مالك الروم : **`,value:`**<@${interaction.user.id}>**`,inline:false} , {name:`**مدة الروم : **`,value:`**\`${room}\`**`,inline:false} , {name:`**ينتهي الروم في : **`,value:`**<t:${roomdet}:R>**`,inline:false} , {name:`**تاريخ انشاء الروم : **`,value:`**${createin}**`,inline:false} , {name:`**تاريخ انتهاء الروم : **`,value:`**${endsin2}**`,inline:false})
                let b = await channell.send({embeds:[embed6]})
                let embed7 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**انتهت صلاحية الروم وسيتم حذفه بعد 12 ساعة تلقائيا**`)
                setTimeout(() => b.reply({embeds:[embed7]}), ms(room))
                setTimeout(() => channell.permissionOverwrites.set([
        {
          id:interaction.user.id,
              deny:PermissionsBitField.Flags.SendMessages
        },{
              id:evero,
              deny:PermissionsBitField.Flags.SendMessages
            }
                   
      ])
                           , ms(room))
                setTimeout(() =>
                        channell.delete()
                          ,ms(room) + 1000 * 60 * 60 * 12)
        })
        collector.on('end' , collected => {
                if(!db.has(`${interaction.user.id}_buying`)) return;
                let embed8 = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**انتهى وقت العملية**`)
                return interaction.channel.send({embeds:[embed8]})
        })
}
}