import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "todo-app-13110.firebaseapp.com",
  databaseURL: "https://todo-app-13110.firebaseio.com",
  projectId: "todo-app-13110",
  storageBucket: "todo-app-13110.appspot.com",
  messagingSenderId: "579848659445",
  appId: process.env.FIREBASE_APPID,
  measurementId: "G-YNF3LN0RX3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
