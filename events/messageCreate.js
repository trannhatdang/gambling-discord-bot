const { Events } = require('discord.js');
const { addPoints, PointsEvent } = require('../points-policy.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		// await addPoints(message.author.username, PointsEvent.Message);
		// console.log(`Added message points for ${message.author.username}`);
	},
};
