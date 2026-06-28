const { writeUserData, getUserData, updateUserData } = require('./database.js')

messagePoints = 10;

const PointsEventEnum = Object.freeze({
	MESSAGE: Symbol('message')
})

module.exports = {
	PointsEvent: PointsEventEnum,
	async addPoints(username, pointsEvent){
		switch(pointsEvent){
			case PointsEventEnum.Message:
				userData = await getUserData(username);
				userData.points += messagePoints;
				await updateUserData(userData);
				break;
			default:
				console.log('default case');
				break;

		}

	}
}
