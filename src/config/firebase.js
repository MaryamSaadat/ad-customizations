// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbub1xHJEAltp8sqc3P4dD6_y4wTVx40M",
  authDomain: "ad-customizations.firebaseapp.com",
  projectId: "ad-customizations",
  storageBucket: "ad-customizations.appspot.com",
  messagingSenderId: "330707644639",
  appId: "1:330707644639:web:4e345035e100dc4e5ff96a",
  measurementId: "G-DG7453RG0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);