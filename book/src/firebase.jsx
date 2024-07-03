// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQD_hpBvMlPSefhYZzh-a1l-ohnsr5rI8",
  authDomain: "book-9cc77.firebaseapp.com",
  projectId: "book-9cc77",
  storageBucket: "book-9cc77.appspot.com",
  messagingSenderId: "784421669137",
  appId: "1:784421669137:web:422e94e984f6ec19a2a4b0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
