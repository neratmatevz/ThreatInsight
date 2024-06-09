import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import firebaseConfig from "../firebase-config.json";
import { GoogleAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";

const firebaseConfigString = process.env.REACT_APP_FIREBASE_CONFIG;

if (!firebaseConfigString) {
  throw new Error('Missing Firebase configuration');
}

const firebaseConfig = JSON.parse(firebaseConfigString);
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const microsoftProvider = new OAuthProvider('microsoft.com');