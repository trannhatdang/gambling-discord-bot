module.exports = {
	userConverter:{
		toFirestore: (user) => {
			return {
				name: user.name,
				points: user.points,
				lastLogin: user.lastLogin
			};
		},
		fromFirestore: (snapshot, options) => {
			const data = snapshot.data(options);
			return new User(data.name, data.state, data.lastLogin);
		}
	}
}
