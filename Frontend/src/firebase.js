// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Xt7viDGxdRNKt9wxZnx-tIzMg5P97DE",
  authDomain: "book-store-1d8fa.firebaseapp.com",
  projectId: "book-store-1d8fa",
  storageBucket: "book-store-1d8fa.firebasestorage.app",
  messagingSenderId: "540929953751",
  appId: "1:540929953751:web:2f1b0851946c44f70e4592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();