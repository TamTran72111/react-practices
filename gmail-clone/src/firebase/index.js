import firebase from 'firebase';

import config from './firebaseConfig';

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
