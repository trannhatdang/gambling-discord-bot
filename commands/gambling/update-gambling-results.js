const { SlashCommandBuilder } = require('discord.js');
const { updateGamblingData } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder().setName('update-gambling-result').setDescription('Cập nhật kết quả gamba'),
	async execute(interaction) {
		// console.log(interaction.user.id)
		await updateGamblingData();
		await interaction.reply('Updated! Check your points!');
	},
};
