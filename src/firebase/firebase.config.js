
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALdu3M3qO1m7fLdOGfGzKmNyZWXFRkqa4",
  authDomain: "toy-topia-projects-bbe87.firebaseapp.com",
  projectId: "toy-topia-projects-bbe87",
  storageBucket: "toy-topia-projects-bbe87.firebasestorage.app",
  messagingSenderId: "8448007215",
  appId: "1:8448007215:web:ad730cb4c7182a12c1bada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);