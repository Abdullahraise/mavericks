// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUMPabu1Lobay3F6myIgTeZk8gNTDXraI",
  authDomain: "mavericks-3158a.firebaseapp.com",
  projectId: "mavericks-3158a",
  storageBucket: "mavericks-3158a.appspot.com",
  messagingSenderId: "969803384859",
  appId: "1:969803384859:web:87c825d31d5f21711b90be",
  measurementId: "G-D91MKV9LPQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
