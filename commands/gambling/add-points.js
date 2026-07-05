const { SlashCommandBuilder } = require('discord.js');
const { getUserData, writeUserData } = require('../../database.js')

module.exports = {
	data: new SlashCommandBuilder().setName('add-points').setDescription('Them Diem'),
	async execute(interaction) {
		const data = await getUserData(interaction.user.id);
		await interaction.reply(data);
	},
};
