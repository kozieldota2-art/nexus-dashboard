import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyDZKcGvLHXCjrIdImTVhVGF6Zz4nJFuUoQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "erp-galpas.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "erp-galpas",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "erp-galpas.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "653262190463",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:653262190463:web:63cfa0c85ffab8162c4c4a",
};

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.appId,
);

const inBrowser = typeof window !== "undefined";

export const firebaseApp = firebaseConfigured && inBrowser
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

// Named database: Nexus data never falls back to the project's (default) database.
export const nexusDb = firebaseApp ? getFirestore(firebaseApp, "nexus") : null;
