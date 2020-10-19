import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import firebaseConfig from "./firebase-config";
// import { seedDatabase } from "../seed";

export const firebase = Firebase.initializeApp(firebaseConfig);

// seedDatabase(firebase);
