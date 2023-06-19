import { initializeApp } from "firebase/app";
import { FirebaseConfig } from '../types/customTypes';

import {
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCcBtVyduWfeLb9teFNhq2j98Ny4FWLvVc",
  authDomain: "nc-parks.firebaseapp.com",
  databaseURL:
    "https://nc-parks-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nc-parks",
  storageBucket: "nc-parks.appspot.com",
  messagingSenderId: "188799614960",
  appId: "1:188799614960:web:02e0940c242d71545d6735",
};

initializeApp(firebaseConfig);

const auth = getAuth();

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

//   To get the below to work, make sure that you have the firebase emulator running and listen.ts running
// From there, go a POST to http://localhost:9191/api/users/ with the below ...
// {
//   "email": "joe@example.com",
//   "username": "JoeB",
//   "password": "abc1232",
//   "type": "consumer"
// }
// ... from after this, the auth error should change to be "signed in user_11"

// import { firebaseSignIn } from "utils/Firebase";
// const email = "joe@example.com";
// const password = "abc1232";
// firebaseSignIn(email, password)

export const firebaseSignIn = (email: string, password: string): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`signed in ${user.uid}`);
    })
    .catch((error) => {
      console.log(error);
    });
}