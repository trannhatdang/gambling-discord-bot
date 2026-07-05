const { SlashCommandBuilder } = require('discord.js');
const { getUserData, writeUserData } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder().setName('get-points').setDescription('Xem Điểm'),
	async execute(interaction) {
		const data = await getUserData(interaction.user.id);
		await interaction.reply(`You have ${data.points}!`)
	},
};
