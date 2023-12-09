import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpQMqnTClj6CxPbrr76pahhsRLdalFn78",
    authDomain: "polyglotify.firebaseapp.com",
    projectId: "polyglotify",
    storageBucket: "polyglotify.appspot.com",
    messagingSenderId: "311085541222",
    appId: "1:311085541222:web:43b9700fe9057b085c8aa7",
    measurementId: "G-CMVC0K4ZXK"
};


const app = initializeApp(firebaseConfig);

// Used Firebase modules
export const analytics = getAnalytics(app);
export const auth = getAuth(app);