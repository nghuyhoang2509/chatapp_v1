// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVQtcXB8u1POBbDL12BuPpDKktjFr3ng8",
  authDomain: "https://chatapp-v1.netlify.app",
  projectId: "chatapp-eb7c3",
  storageBucket: "chatapp-eb7c3.appspot.com",
  messagingSenderId: "1006306276906",
  appId: "1:1006306276906:web:5935fdde2e4d9f2bd37553",
  measurementId: "G-4TE28H3MKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
