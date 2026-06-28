const { SlashCommandBuilder } = require('discord.js');
const { writeUserData } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder().setName('init-gambling').setDescription('Tao tai khoan gambling'),
	async execute(interaction) {
		writeUserData(interaction.user.username, 0);
		await interaction.reply('okie gambler');
	},
};
