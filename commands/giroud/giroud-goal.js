const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('giroud-goal').setDescription('Xem highlight giroud'),
	async execute(interaction) {
		await interaction.reply('doi xiu');
	},
};
