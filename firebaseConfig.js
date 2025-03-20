import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7wmWf7cPm2vHouyaeTzVu-Yjt_iKJoS0",
  authDomain: "splitbill-15b90.firebaseapp.com",
  projectId: "splitbill-15b90",
  storageBucket: "splitbill-15b90.appspot.com",
  messagingSenderId: "517858524750",
  appId: "1:517858524750:android:7899083a2c3f6c57f20d1f"
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);