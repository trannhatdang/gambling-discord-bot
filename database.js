import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, writeBatch } from 'firebase/firestore/lite';

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

export async function writeUserData(username, points)
{
	try {
	  const docRef = await addDoc(collection(db, "users"), {
	    username: username,
	    points: points
	  });
	  console.log("Document written with ID: ", docRef.id);
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}

// export async function writeBatchUserData(usernameList, pointList)
// {
// 	try {
// 		const docRe
// 	}
// }
