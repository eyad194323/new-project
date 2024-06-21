const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send(`Im Ready`);
});
app.listen(3000, () => {
});
const { Client, Collection, GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder , ButtonStyle , Message } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
const config = require("./config.json");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const path = require('node:path');
const fs = require('node:fs');
const db = require('quick.db')
let prefix = config.prefix
client.commandaliases = new Collection()
const rest = new REST({ version: '10' }).setToken(process.env.token);
module.exports = client;
//-
client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`Done set everything`);
})
//
client.slashcommands = new Collection()
const slashcommands = [];
const ascii = require('ascii-table');
const table = new ascii('Commands').setJustify();
for (let folder of readdirSync('./commands/').filter(folder => !folder.includes('.'))) {
  for (let file of readdirSync('./commands/' + folder).filter(f => f.endsWith('.js'))) {
	  let command = require(`./commands/${folder}/${file}`);
	  if(command) {
		  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
		  if(command.data.name) {
			  table.addRow(`/${command.data.name}` , '🟢 Working')
		  }
		  if(!command.data.name) {
			  table.addRow(`/${command.data.name}` , '🔴 Not Working')
		  }
	  }
  }
}
console.log(table.toString())


//event-handler
readdirSync('./events').forEach(async file => {
	const event = await require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

//nodejs-events
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//


client.on('ready' , async() => {
        if(!db.has(`products_number`)) db.set(`products_number` , 1)
        if(!db.has(`unwords`)) db.set(`unwords` , [])
        if(!db.has(`shop_coupouns`)) db.set(`shop_coupouns` , [])
        if(!db.has(`private_rooms`)) db.set(`private_rooms` , [])
        if(!db.has(`shop_roles`)) db.set(`shop_roles` , ["123"])
})

client.on("channelCreate" , (channel) => {
    if(channel.name.startsWith(`ticket`) || channel.name.startsWith(`Ticket`)) {
        const row = new  ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('claim_ticket')
					.setLabel('⚙️')
					.setStyle(ButtonStyle.Primary),)
        let embed1 = new EmbedBuilder()
        .setTimestamp()
        .setTitle(`**اضغط علي الزر لاستلام التكت**`)
        //setColor('00000')
        channel.send({embeds:[embed1] , components:[row]})
    }
})
client.on(Events.InteractionCreate , async (interaction) => {
        if(interaction.customId == "claim_ticket") {
          let allowedRoleID = "1105187636685066340"
          if (!interaction.member.roles.cache.some(role => role.id === allowedRoleID)) return;
        interaction.channel.edit({name:`ticket-${interaction.user.username}`})
        let embed1 = new EmbedBuilder()
        .setDescription(`**تم استلام التكت بواسطة : ${interaction.user}**`)
        .setTimestamp()
            .setColor('6a0b0b')
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        interaction.channel.send({embeds:[embed1]})
        interaction.message.delete()
        if(!db.has(`${interaction.user.id}_ticketscount`)) {
            db.set(`${interaction.user.id}_ticketscount` , 0)
        }
        let ticketscount = db.get(`${interaction.user.id}_ticketscount`)
        ticketscount = Math.floor(ticketscount + (1))
        db.delete(`${interaction.user.id}_ticketscount`)
        db.set(`${interaction.user.id}_ticketscount` , ticketscount)
    }
})

client.on(`messageCreate` , async message => {
        if(message.author.bot) return;
        let unwords = db.get(`unwords`)
        if(!db.has(`unwords`)) db.set(`unwords` , [])
        unwords.forEach((unword) => {
                if(message.content.includes(unword)) {
                        try{
                               return message.delete();
                        }catch(error) {
                                return;
                        }
                }
        })
})






client.login(process.env.token)