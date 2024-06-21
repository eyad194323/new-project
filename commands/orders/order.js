const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const client = require("../..");
let db = require('quick.db');
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('order')
    .setDescription('طلب شيء ما')
    .addStringOption(Option => 
        Option
        .setName('theorder')
        .setDescription('الشيء المراد طلبه')
        .setRequired(true)), // or false
async execute(interaction) {
        let roomidid = db.get(`orders_room`)
        if(interaction.channel.id !== roomidid) return interaction.reply({content:`**توجه الي : <#${roomidid}>**` , ephemeral:true});
        let theorder = interaction.options.getString(`theorder`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**يرجى تحديد نوع طلبك**`)
        .addFields([
            {
                name:'**منتج: 🎮**' , value:'**منتج مثل نيترو,حسابات,العاب,عملات اي شي غير تصميم وغير برمجه**' , inline:false
            },
            {
                name:'**تصاميم: 🎨**' , value:'**تصاميم مثل تصميم صور سيرفر ,تصميم لوجو قناه,اي شي يخص تصاميم**' , inline:true
            },
            {
                name:'**برمجة: 🖥️**' , value:'**برمجيات مثل مطلوب بوت قيف اواي,تصليح كود اي شي يخص برمجيات**' , inline:true
            },
                {
                        name:`**للالغاء : ❌**` , value:`**اذا تريد الغاء الطلب**` , inline:true
                }
        ])
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('products_button')
					.setLabel('🎮')
					.setStyle(ButtonStyle.Primary),)
        .addComponents(
				new ButtonBuilder()
					.setCustomId('designs_button')
					.setLabel('🎨')
					.setStyle(ButtonStyle.Primary),)
        .addComponents(
				new ButtonBuilder()
					.setCustomId('programming_button')
					.setLabel('🖥️')
					.setStyle(ButtonStyle.Primary),)
        .addComponents(
				new ButtonBuilder()
					.setCustomId('cancel_order')
					.setLabel('❌')
					.setStyle(ButtonStyle.Danger),)
        
        let a1 = await interaction.reply({embeds:[embed1] , components:[row]})
        try{setTimeout(() => a1.delete(), 60 * 1000);}catch(error){console.error(`Deleted`)}
        const filter = i => i.isButton() && ['products_button', 'designs_button', 'programming_button', 'cancel_order'].includes(i.customId);

const collector = interaction.channel.createMessageComponentCollector({
    filter,
    max: 1, // maximum number of components to collect
    time: 1000 * 60 // time to wait for a component (in milliseconds)
});
        let products_number = db.get(`products_number`)
collector.on('collect' , async i => {
        if (i.customId === 'products_button') {
       let donebutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.user.id , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**تم ارسال طلبك الى البائعين , الرجاء الانتظار لـ يتواصل معك احد البائعين**`)
                let productsroom = db.get(`products_room_id`);
                let productsment = db.get(`products_role_id`);
                interaction.channel.send({embeds:[donebutton]}).then(msg => {
                        try{
                                setTimeout(() => msg.delete(),10 * 1000)
                        }catch(error){
                        console.error(`Deleted Before i delete`)
                }
                })
                let productsbutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                 .setTitle(`**طلب جديد**`)
                .addFields({name:`**الطلب : **`,value:`**\`${theorder}\`**`,inline:false} , {name:`**رقم الطلب : **`,value:`**\`${products_number}\`**`,inline:false})
                client.channels.cache.find(ch => ch.id == productsroom).send({embeds:[productsbutton] , content:`<@&${productsment}>\nصاحب الطلب : ${interaction.user}`})
                client.channels.cache.find(ch => ch.id == productsroom).send({files:[
                        {
                                name:`line.gif`,
                                attachment:`https://cdn.discordapp.com/attachments/1103619122094419998/1110984723490152539/lv_0_20230522125214.gif`
                        }
                ]})
                let newproducts_number = products_number + 1
                db.delete(`products_number`)
                db.set(`products_number` , newproducts_number)
                return a1.delete();
    }
        if(i.customId === 'designs_button') {
                let donebutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**تم ارسال طلبك الى البائعين , الرجاء الانتظار لـ يتواصل معك احد البائعين**`)
                let productsroom = db.get(`designs_room_id`);
                let productsment = db.get(`designs_role_id`);
                interaction.channel.send({embeds:[donebutton]}).then(msg => {
                        try{
                                setTimeout(() => msg.delete(),10 * 1000)
                        }catch(error){
                        console.error(`Deleted Before i delete`)
                }
                })
                let productsbutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.user.id})
        .setTimestamp(Date.now())
        .setColor('#000000')
                                 .addFields({name:`**الطلب : **`,value:`**\`${theorder}\`**`,inline:false} , {name:`**رقم الطلب : **`,value:`**\`${products_number}\`**`,inline:false})
                client.channels.cache.find(ch => ch.id == productsroom).send({embeds:[productsbutton] , content:`<@&${productsment}>\nصاحب الطلب : ${interaction.user}`})
                client.channels.cache.find(ch => ch.id == productsroom).send({files:[
                        {
                                name:`line.gif`,
                                attachment:`https://cdn.discordapp.com/attachments/1103619122094419998/1110984723490152539/lv_0_20230522125214.gif`
                        }
                ]})
                let newproducts_number = products_number + 1
                db.delete(`products_number`)
                db.set(`products_number` , newproducts_number)
                return a1.delete();
        }
        if(i.customId === 'programming_button') {
                let donebutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
                .setTitle(`**تم ارسال طلبك الى البائعين , الرجاء الانتظار لـ يتواصل معك احد البائعين**`)
                let productsroom = db.get(`programming_room_id`);
                let productsment = db.get(`programming_role_id`);
                interaction.channel.send({embeds:[donebutton]}).then(msg => {
                        try{
                                setTimeout(() => msg.delete(),10 * 1000)
                        }catch(error){
                        console.error(`Deleted Before i delete`)
                }
                })
                let productsbutton = new EmbedBuilder()
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.user.id})
        .setTimestamp(Date.now())
        .setColor('#000000')
                 .setTitle(`**طلب جديد**`)
                .addFields({name:`**الطلب : **`,value:`**\`${theorder}\`**`,inline:false} , {name:`**رقم الطلب : **`,value:`**\`${products_number}\`**`,inline:false})
                client.channels.cache.find(ch => ch.id == productsroom).send({embeds:[productsbutton] , content:`<@&${productsment}>\nصاحب الطلب : ${interaction.user}`})
                client.channels.cache.find(ch => ch.id == productsroom).send({files:[
                        {
                                name:`line.gif`,
                                attachment:`https://cdn.discordapp.com/attachments/1103619122094419998/1110984723490152539/lv_0_20230522125214.gif`
                        }
                ]})
                let newproducts_number = products_number + 1
                db.delete(`products_number`)
                db.set(`products_number` , newproducts_number)
                return a1.delete();
        }
        if(i.customId === 'cancel_order') {
              return a1.delete();
        }
})
        
}
}