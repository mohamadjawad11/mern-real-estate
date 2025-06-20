// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-b55af.firebaseapp.com",
  projectId: "mern-real-estate-b55af",
  storageBucket: "mern-real-estate-b55af.firebasestorage.app",
  messagingSenderId: "854528324351",
  appId: "1:854528324351:web:29613f96837acd1bf0d2ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//9f7a35c9176c30c507aa666e3809b603