// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACIogvjR-TzSRUjswQmyJ2v1DODrgyc2M",
  authDomain: "docapp-f286c.firebaseapp.com",
  projectId: "docapp-f286c",
  storageBucket: "docapp-f286c.appspot.com",
  messagingSenderId: "802179062651",
  appId: "1:802179062651:web:14963a6c0cf3d3e46a7bde",
  measurementId: "G-PJGTJ5NL8M",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
