// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { setLogin, setUserFromGoogleAuth } from "../store/sessionSlice";
import { useDispatch } from "react-redux";
import { store } from "../pages/_app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfQyuuDxl-X494Jm6WrLmwZXIqXKI0cDQ",
  authDomain: "algoblog-2c1d7.firebaseapp.com",
  projectId: "algoblog-2c1d7",
  storageBucket: "algoblog-2c1d7.appspot.com",
  messagingSenderId: "1058612979456",
  appId: "1:1058612979456:web:836ecb41cd49d789d875e5",
  measurementId: "G-6ZP0VVVY30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth();

export const logout = () => {
  auth.signOut();
  let d = store.dispatch;
  d(setLogin(false));
  d(setUserFromGoogleAuth({}))
}