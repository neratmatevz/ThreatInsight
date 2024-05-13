import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCG8yRJN0o1LbKPRswcE8k9ITRZ-sidcc",
  authDomain: "threatinsight-79a9a.firebaseapp.com",
  projectId: "threatinsight-79a9a",
  storageBucket: "threatinsight-79a9a.appspot.com",
  messagingSenderId: "560128259758",
  appId: "1:560128259758:web:de83f92447ffd757badf3f",
  measurementId: "G-9RX4RK80MH"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);