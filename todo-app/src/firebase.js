import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "todo-app-react-practise.firebaseapp.com",
  databaseURL: "https://todo-app-react-practise.firebaseio.com",
  projectId: "todo-app-react-practise",
  storageBucket: "todo-app-react-practise.appspot.com",
  messagingSenderId: "82311052736",
  appId: process.env.FIREBASE_APPID,
  measurementId: "G-YRYFH4P6CS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
