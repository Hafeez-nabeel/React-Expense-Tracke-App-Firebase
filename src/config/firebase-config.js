// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHzDnUBsXhnhzg2MTrQ74D-x49ga2DS-M",
  authDomain: "expenseapp-d3e3b.firebaseapp.com",
  projectId: "expenseapp-d3e3b",
  storageBucket: "expenseapp-d3e3b.appspot.com",
  messagingSenderId: "120367543312",
  appId: "1:120367543312:web:8b2660aaaa4efba7258695",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
