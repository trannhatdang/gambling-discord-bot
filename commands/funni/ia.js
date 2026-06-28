const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ia').setDescription('TOI IA'),
	async execute(interaction) {
		await interaction.reply(':poop:');
	},
};
