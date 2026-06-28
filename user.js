module.exports = class User {
	constructor (name, points, lastLogin ) {
		this.name = name;
		this.points = points;
		this.lastLogin = lastLogin;
	}
	toString() {
		return this.name + ', ' + this.points + ', ' + this.lastLogin;
	}
},
