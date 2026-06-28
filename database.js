const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, 
	query, where,
	writeBatch, doc, setDoc,
	getDocs, getDocFromCache } = require('firebase/firestore/lite');
const { User, userConverter } = require('./user-converter.js')

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

module.exports = {
	async writeUserData(username, points){
		try {
			const ref = doc(db, 'users').withConverter(userConverter);
			const docRef = await setDoc(ref, new User(username, points, Date.now()));
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	},
	async getUserData(username){
		try{
			const q = query(collection(db, 'users')
				,where('points', '==', username)
			)
			const querySnapshot = await getDocs(q);
			console.log(querySnapshot)
			console.log("Got Users Document.");
			return querySnapshot.data();
		} catch (e) {
			console.error("Error getting document: ", e);
		}
	},
	async updateUserData(userData){
		try{
			const docRef = collection(db, 'users');
			const q = query(docRef,
				where('username', '==', userData.username)
			)
			console.log(`query res: ${q}`);
		}
		catch (e) {
			console.error("Erorr updating document: ", e);
		}
	}
}
