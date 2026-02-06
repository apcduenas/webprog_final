import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Palitan ito ng iyong sariling Firebase Config mula sa Firebase Console
// Go to Firebase Console > Project Settings > General > Your Apps > Add App (Web)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
