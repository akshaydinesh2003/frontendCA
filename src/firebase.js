// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxNGMpFzTicolmMm55WvB2-_MNXgmKDLE",
  authDomain: "ca-summarizer.firebaseapp.com",
  databaseURL: "https://ca-summarizer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ca-summarizer",
  storageBucket: "ca-summarizer.firebasestorage.app",
  messagingSenderId: "417016911745",
  appId: "1:417016911745:web:abd013ee27884b343dfa80",
  measurementId: "G-5VT6BY4127"
};

export const app = initializeApp(firebaseConfig);

