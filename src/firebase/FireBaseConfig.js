import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-3hN7FTjecFrtzU5Ip2A2xA6gHiqn0D0",
    authDomain: "satisfai-82135.firebaseapp.com",
    projectId: "satisfai-82135",
    storageBucket: "satisfai-82135.firebasestorage.app",
    messagingSenderId: "431470909997",
    appId: "1:431470909997:web:5d2d63e4b94719e9fbf6a4",
    measurementId: "G-DPKFV8RT4D"
};

const app = initializeApp(firebaseConfig);


export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);
