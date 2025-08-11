// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBl-bk6g8-6dJkEifAId7lWROLjehsDv9k",
    authDomain: "kamranshahzad-2025.firebaseapp.com",
    projectId: "kamranshahzad-2025",
    storageBucket: "kamranshahzad-2025.appspot.com",
    messagingSenderId: "587397090704",
    appId: "1:587397090704:web:431777f8518d43218c7715",
    measurementId: "G-9WKCLTTGEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // <-- Add this line
const analytics = getAnalytics(app);