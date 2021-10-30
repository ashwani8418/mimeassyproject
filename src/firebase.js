import { initializeApp } from "firebase/app";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkBoHxhxQC4-p9Z523QGyTd1B3T0MFh9o",
  authDomain: "otp-verification-ef5b6.firebaseapp.com",
  projectId: "otp-verification-ef5b6",
  storageBucket: "otp-verification-ef5b6.appspot.com",
  messagingSenderId: "879975976928",
  appId: "1:879975976928:web:c1932eaa1b5b3224f16585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;