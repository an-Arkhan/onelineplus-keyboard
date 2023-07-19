import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyClfqW0q9bol5cuE2JVYNru-nPYlEDkwGQ",
  authDomain: "prototype-keyboard.firebaseapp.com",
  projectId: "prototype-keyboard",
  storageBucket: "prototype-keyboard.appspot.com",
  messagingSenderId: "959145304351",
  appId: "1:959145304351:web:5ff446ce3a2fe7fc0b502a",
  measurementId: "G-P0VVE8YV6C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };