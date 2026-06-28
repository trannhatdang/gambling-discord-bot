const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('init-gambling').setDescription('Tao tai khoan gambling'),
	async execute(interaction) {
		await interaction.reply('okie gambler');
	},
};
