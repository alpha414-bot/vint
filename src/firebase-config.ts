// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIdRVESOrRuy-MkOawsemsZqcYw5TvQSQ",
  authDomain: "vint-ecommerce.firebaseapp.com",
  projectId: "vint-ecommerce",
  storageBucket: "vint-ecommerce.appspot.com",
  messagingSenderId: "875924243691",
  appId: "1:875924243691:web:39c861280476191c30eaae",
  measurementId: "G-GW51SXRFJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { analytics, app, db, storage };

