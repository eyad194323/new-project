const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = require("../..");
let db = require('pro.db');
const { clientId , owner } = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reset-tickets')
    .setDescription('بتضيع تعب الناس في 10 ثواني اتقي الله')
    .addUserOption(Option => Option.setName('user').setDescription('الاداري').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return;
       let user = interaction.options.getUser('user')
       let dbuser = db.get(`${user.id}_ticketscount`)
       if (!dbuser) {
        return interaction.reply({ content: `**لَيْسَ لَدَيْهُ ايْ تِيكَتْ ايْ تِيكَتْ**`, ephemeral:true })
       }
       if (dbuser) {
        interaction.reply({ content: `**تَمَّ بِنَجاحٍ ازَالُهُ عَدَدٌ : ${dbuser} مِنْ الشَّخْصِ**` })
        db.delete(`${user.id}_ticketscount`)
       }
    }
}