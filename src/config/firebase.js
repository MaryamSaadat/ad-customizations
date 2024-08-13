// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYz_g-5NGD2VGrjRD9-yGARdJQmgdp6YQ",
  authDomain: "audio-descriptions-c2c33.firebaseapp.com",
  projectId: "audio-descriptions-c2c33",
  storageBucket: "audio-descriptions-c2c33.appspot.com",
  messagingSenderId: "286779202059",
  appId: "1:286779202059:web:b4c6c98f3a73651963050e",
  measurementId: "G-3YT04ECYGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);