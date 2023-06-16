import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDQ-x50bsp_Kg_jPp6GWAfmRD_frIqNlE",
    authDomain: "konsistenz-hmk.firebaseapp.com",
    projectId: "konsistenz-hmk",
    storageBucket: "konsistenz-hmk.appspot.com",
    messagingSenderId: "1016851957858",
    appId: "1:1016851957858:web:166564b1fe704d6684a93b",
    measurementId: "G-HSF4JKTYE4"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);


export default db;
