import firebase from "firebase";
import firebaseConfig from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
