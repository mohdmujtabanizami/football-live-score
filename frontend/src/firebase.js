import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHeS-TZ_To2Bb4Q6skfNmFZCQmxAUNTNI",
  authDomain: "scorehub-4691a.firebaseapp.com",
  projectId: "scorehub-4691a",
  storageBucket: "scorehub-4691a.firebasestorage.app",
  messagingSenderId: "486214306105",
  appId: "1:486214306105:web:cabe63c9c18ef5a32d00e8",
  measurementId: "G-Q1J0GEYX95"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();