const { initializeApp } = require('firebase/app');
const { getFirestore, collection,
	query, where, writeBatch,
	doc, setDoc, getDoc, getDocs, getDocFromCache } = require('firebase/firestore/lite');
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
		this.lastLogin = lastLogin;
	}
	toString() {
		return this.points + ', ' + this.lastLogin;
	}
}

const userConverter = {
		toFirestore: (user) => {
			return {
				points: user.points,
				lastLogin: user.lastLogin
			};
		},
		fromFirestore: (snapshot, options) => {
			const data = snapshot.data(options);
			return new User(data.points, data.lastLogin);
		}
	}

module.exports = {
	async writeUserData(id, points){
		try {
			// const shieet = new User(id, points, Date.now());
			const ref = doc(db, 'users', id).withConverter(userConverter);
			const docRef = await setDoc(ref, new User(points, Date.now()));
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
	async updateUserData(userData){
		try{
			const docRef = doc(db, 'users', id).withConverter(userConverter);
			console.log(`doc res: ${docRef}`);
		}
		catch (e) {
			console.error("Error updating document: ", e);
		}
	}
}
