// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDsdR3Y_fe0g4tOFN0tMeZMo0aGXAZINE",
  authDomain: "intellinotes-f6e6e.firebaseapp.com",
  projectId: "intellinotes-f6e6e",
  storageBucket: "intellinotes-f6e6e.appspot.com",
  messagingSenderId: "235037277682",
  appId: "1:235037277682:web:4628890cf928dc517abf6b",
  measurementId: "G-FPBPNHG616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };