const { SlashCommandBuilder } = require('discord.js');
const { createGamba } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-gamba')
		.setDescription('Tạo gamba')
		.addStringOption((option) => option.setName('name').setDescription('Tên gamba, pls').setRequired(true)),
	async execute(interaction) {
		await createGamba(interaction.options.getString('name'));
		await interaction.reply('Created! Bet away!');
	},
};
