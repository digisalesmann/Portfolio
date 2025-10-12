// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9tufXHLryYiRRndTe9rbiXZjl4faAIzE",
  authDomain: "portfolio-22c56.firebaseapp.com",
  projectId: "portfolio-22c56",
  storageBucket: "portfolio-22c56.firebasestorage.app",
  messagingSenderId: "790009382969",
  appId: "1:790009382969:web:b1390f3481fe750728e5e8",
  measurementId: "G-QHX8SXF5V1"
};

// Prevent re-initialization during Next.js Fast Refresh
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Optional: Analytics only works in browser
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
