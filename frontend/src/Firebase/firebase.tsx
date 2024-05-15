import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import firebaseConfig from './firebase-config.json';


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);