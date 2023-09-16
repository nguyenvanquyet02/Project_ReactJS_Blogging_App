import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmIC5PBnZ5pouwPcmFhheXlSjUoAAYwM0",
    authDomain: "blogging-f0ade.firebaseapp.com",
    projectId: "blogging-f0ade",
    storageBucket: "blogging-f0ade.appspot.com",
    messagingSenderId: "938543491817",
    appId: "1:938543491817:web:f76f0fa9baa1fa79c0de78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);