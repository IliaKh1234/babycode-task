import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCBRNXLPGaRpcQi-sihqcvn5GmXtI7AAR4",
  authDomain: "babycode-test.firebaseapp.com",
  projectId: "babycode-test",
  storageBucket: "babycode-test.firebasestorage.app",
  messagingSenderId: "150807216827",
  appId: "1:150807216827:web:ba89f006a3301a14821f9e",
  measurementId: "G-GNT3567RGK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const analytics = getAnalytics(app);

export { auth, db, analytics }; 
