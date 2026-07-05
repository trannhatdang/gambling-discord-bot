const { initializeApp } = require('firebase/app');
const { getFirestore, collection,
	query, where, writeBatch,
	doc, addDoc, setDoc, getDoc, getDocs, getDocFromCache, deleteDoc,
	Timestamp } = require('firebase/firestore/lite');
// const { User, userConverter } = require('./user-converter.js')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "giroud-bot.firebaseapp.com",
  projectId: "giroud-bot",
  storageBucket: "giroud-bot.firebasestorage.app",
  messagingSenderId: "506668058645",
  appId: "1:506668058645:web:4019bb754858ca0dbce61c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class User {
	constructor (points, lastLogin) {
		this.points = points;
	}
	toString() {
		return this.points;
	}
}

const userConverter = {
	toFirestore: (user) => {
		return {
			points: user.points,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new User(data.points);
	}
}

class Gamba {
	constructor (name, left = false, right = false, players = null, time = null) {
		this.left = left;
		this.right = right;
		this.name = name;
		this.players = players;
		this.time = time;
	}
	toString() {
		return this.name + `(${left}, ${right})`
	}
}

const gambaConverter = {
	toFirestore: (gamba) => {
		return {
			left: gamba.left,
			right: gamba.right,
			name: gamba.name,
			players: gamba.players,
			time: gamba.time
		};
	},
	fromFireStore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Gamba(data.name, data.left, data.right, data.players, data.time)
	}

}

module.exports = {
	async calculateRate(gambaData){
		try{
			const players = gambaData.players;

			let leftTotal = 0;
			let rightTotal = 0;

			players.forEach((player) => {
				const semi_index = player.indexOf(":");
				const points = Number(player.slice(semi_index + 1))

				if(points > 0) {
					rightTotal += points;
				}
				else {
					leftTotal += points;
				}
			})
			const total = leftTotal + rightTotal;

			return {
				leftOdds: total/leftTotal,
				rightOdds: total/rightTotal
			}
		} catch (e) {
			console.error("Error finding rate: ", e);
		}
	},
	async updatePlayerPoints(player, rightWin, rates){
		try{
			const semi_index = player.indexOf(":");
			const id = player.slice(0, semi_index)
			const points = Number(player.slice(semi_index + 1))

			if(points > 0 && rightWin || points < 0 && !rightWin)
			{
				if(rightWin) {
					const rate = rates.rightOdds;
				}
				else {
					const rate = rates.leftOdds;
				}

				await writeUserData(id, points * rate);
			}
		} catch (e) {
			console.error("Error processing document: ", e);
		}
	},
	async writeUserData(id, points){
		try {
			// const shieet = new User(id, points, Date.now());
			const ref = doc(db, 'users', id).withConverter(userConverter);
			const res = await setDoc(ref, new User(points));
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	},
	async getUserData(id){
		try{
			const ref = doc(db, 'users', id).withConverter(userConverter);
			const docSnap = await getDoc(ref);
			return docSnap.data();
		} catch (e) {
			console.error("Error getting document: ", e);
		}
	},
	async createGamba(name){
		try{
			const ref = collection(db, 'gamba').withConverter(gambaConverter);
			const docRef = await addDoc(ref, new Gamba(name));
		}
		catch (e) {
			console.error("Error creating gamba: ", e);
		}
	},
	async queryGamba(name){
		try{
			//prob no need

		}
		catch (e) {
			console.error("Error querying gamba: ", e);
		}
	},
	async updateGamblingData(){
		try{
			const querySnapshot = await getDocs(collection(db, 'gamba').withConverter(gambaConverter));
			querySnapshot.forEach(async (doc) => {
				// console.log(doc.id, " => ", doc.data())
				const gambaData = doc.data();

				const rates = calculateRate(gambaData);

				const left = gambaData.left;
				const right = gambaData.right;

				if(!left && !right) {
					return;
				}

				if(left && right) {
					return;
				}

				const players = gambaData.players;
				players.forEach((player) => updatePlayerPoints(player, right, rates));

				await deleteDoc(doc);
			});
		}
		catch (e) {
			console.error("Error updating gamba: ", e);
		}
	}
}
