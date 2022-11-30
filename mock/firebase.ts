// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setLogin, setUserFromGoogleAuth } from "../store/sessionSlice";
import { useDispatch } from "react-redux";
import { store } from "../pages/_app";
import "firebase/firestore"; 
import "firebase/auth"; 

import { getApps, initializeApp } from "firebase/app";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"; 



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
};

// Initialize Firebase
let app;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

export { 
  app 
};

// export const analytics = getAnalytics(app);

// AUTHENTIFICATION METHODS
export const auth = getAuth();




export const logout = () => {
  auth.signOut();
  let d = store.dispatch;
  d(setLogin(false));
  d(setUserFromGoogleAuth({}))
}

const db = getFirestore();

export  const likeDocument = async (documentName : string, alreadyLiked : boolean) => {
  const likes = collection(db, "Likes");
  let doc_ = doc(likes, auth.currentUser?.uid);
  if (alreadyLiked)
  {
    await updateDoc(doc_, {
      documentNames: arrayRemove(documentName),
      like_count : 1,
    })
    return;
  }
  let obj = getDoc(doc_);
  if ((await obj).exists()){
    await updateDoc(doc_, {
      // email: auth.currentUser?.email, 
      // uid: auth.currentUser?.uid,
      documentNames: arrayUnion(documentName),
      likes_count: 1,
    });
  }
  else{
    await setDoc(doc_, {
      // email: auth.currentUser?.email, 
      // uid: auth.currentUser?.uid,
      documentNames: arrayUnion(documentName),
      likes_count: 1,
    });
  }
}

export const isDocumentLiked = async () => {
  const likes = collection(db, "Likes");
  return await getDoc(doc(likes, auth.currentUser?.uid)); 
}

// // FIRESTORE DATA
// const sendData = () => {
//   try {
//     firebase.firestore().collection('later').doc('user').set({
//       number_data : auth.logData.email
//     })
//   }catch(ex){
//     console.log(ex)
//   }
// }

// sendData();