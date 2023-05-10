// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfFEKB5Phmsh8HA6xSogHfG9e22yPMt_Y",
    authDomain: "react-cursos-cb983.firebaseapp.com",
    projectId: "react-cursos-cb983",
    storageBucket: "react-cursos-cb983.appspot.com",
    messagingSenderId: "1028180327847",
    appId: "1:1028180327847:web:23cb548a5581dab3194a82"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp)
