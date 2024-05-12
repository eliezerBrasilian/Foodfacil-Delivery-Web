import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCw1vzljDixVSH67uzZHZpYBMd1-eukl_M",
  authDomain: "foodfacil-d0c86.firebaseapp.com",
  projectId: "foodfacil-d0c86",
  storageBucket: "foodfacil-d0c86.appspot.com",
  messagingSenderId: "191389897644",
  appId: "1:191389897644:web:c268b48071b150fa68a009",
  measurementId: "G-RYPM9JV8CS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
