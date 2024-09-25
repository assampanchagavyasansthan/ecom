// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyAN1r32cqgr1LtcNoGRCTGPeeKIsD5ZQXk",
  authDomain: "ecomerse-f1c37.firebaseapp.com",
  projectId: "ecomerse-f1c37",
  storageBucket: "ecomerse-f1c37.appspot.com",
  messagingSenderId: "640269939096",
  appId: "1:640269939096:web:ea8cfaec5ed4c7c68bfbed",
  measurementId: "G-LVCV377895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore, Storage, and Authentication instances
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Initialize and export Firebase Authentication
