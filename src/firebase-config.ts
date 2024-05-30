// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIdRVESOrRuy-MkOawsemsZqcYw5TvQSQ",
  authDomain: "vint-ecommerce.firebaseapp.com",
  databaseURL: "https://vint-ecommerce-default-rtdb.firebaseio.com",
  projectId: "vint-ecommerce",
  storageBucket: "vint-ecommerce.appspot.com",
  messagingSenderId: "875924243691",
  appId: "1:875924243691:web:39c861280476191c30eaae",
  measurementId: "G-GW51SXRFJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);

export { app, auth, firestore };

