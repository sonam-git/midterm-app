// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "data-driven-full-stack-app.firebaseapp.com",
  projectId: "data-driven-full-stack-app",
  storageBucket: "data-driven-full-stack-app.appspot.com",
  messagingSenderId:process.env.NEXT_PUBLIC_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//connect for Authentication
const auth = getAuth(app);
//connect for Firestore DB
const db = getFirestore(app);

export { auth, db };