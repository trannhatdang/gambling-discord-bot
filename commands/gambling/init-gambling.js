const { SlashCommandBuilder } = require('discord.js');
const { writeUserData } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder().setName('init-gambling').setDescription('Tao tai khoan gambling'),
	async execute(interaction) {
		// console.log(interaction.user.id)
		await writeUserData(interaction.user.id, 0);
		await interaction.reply('okie gambler');
	},
};
