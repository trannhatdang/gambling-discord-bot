const { writeUserData, getUserData, updateUserData } = require('./database.js')

messagePoints = 10;

const PointsEventEnum = Object.freeze({
	MESSAGE: Symbol('message')
})

module.exports = {
	PointsEvent: PointsEventEnum,
	async addPoints(id, pointsEvent){
		switch(pointsEvent){
			case PointsEventEnum.Message:
				userData = await getUserData(id);
				userData.points += messagePoints;
				await updateUserData(id, userData);
				break;
			default:
				console.log('default case');
				break;
		}

	}
}
