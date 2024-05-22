import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyCw1vzljDixVSH67uzZHZpYBMd1-eukl_M",
  authDomain: "foodfacil-d0c86.firebaseapp.com",
  projectId: "foodfacil-d0c86",
  storageBucket: "foodfacil-d0c86.appspot.com",
  messagingSenderId: "191389897644",
  appId: "1:191389897644:web:6db8b8d5ced54caf68a009",
  measurementId: "G-7QPPXBX074",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, provider, storage };
