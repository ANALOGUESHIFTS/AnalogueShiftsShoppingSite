import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDplj2QjdvwGTvg3vKZ-w_FjztFKK69DBM",
  authDomain: "cinnamon19fashion-101a1.firebaseapp.com",
  projectId: "cinnamon19fashion-101a1",
  storageBucket: "cinnamon19fashion-101a1.appspot.com",
  messagingSenderId: "716433825298",
  appId: "1:716433825298:web:c1fcd2ce95db48d3e1c2cb",
  measurementId: "G-MTXM3ZFJS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage = getStorage(app);