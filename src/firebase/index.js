import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClK7NpCVCg2XE5EvGNRwBVeplfRREKdVA",
    authDomain: "library-app-ea9ee.firebaseapp.com",
    projectId: "library-app-ea9ee",
    storageBucket: "library-app-ea9ee.appspot.com",
    messagingSenderId: "873598863722",
    appId: "1:873598863722:web:c24a219297f659ee78bd13",
    measurementId: "G-EJZZ0VRPQ4",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app);

export { db, auth, storage };
