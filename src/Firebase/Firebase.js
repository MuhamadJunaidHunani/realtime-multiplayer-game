import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8NAMXPtYjIZdwSZ6a0SM8FEErrTzbtJs",
    authDomain: "realtime-multiplayer-gam-fd372.firebaseapp.com",
    projectId: "realtime-multiplayer-gam-fd372",
    storageBucket: "realtime-multiplayer-gam-fd372.firebasestorage.app",
    messagingSenderId: "867962583408",
    appId: "1:867962583408:web:604312c5ec9821b958b7b5"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
