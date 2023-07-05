import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../types/CustomTypes";

import {
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  signOut
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

if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export const firebaseSignIn = (email: string, password: string): Promise<string | null> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`signed in ${user.uid}`)
      return user.uid
    })
    .catch((error) => {
      console.log(error);
      return null
    });
};

export const firebaseSignOut = (): Promise<void> => {
  return signOut(auth).then(() => {
    console.log(`signed out`);
  }).catch((error) => {
    console.log(error);
  });
}

// Example usage
// const auth = getAuth();
// firebaseSignIn("test@example.com", "password1234")
//   .then((result) => {
//     if (result) {
//       console.log("Sign-in successful");
//       // Check if the current user object is not null
//       if (auth.currentUser) {
//         console.log("Current user before sign-out:", auth.currentUser.uid);
//         // Sign out the user
//         firebaseSignOut().then(() => {
//           console.log("Sign-out successful");
//           // Check if the current user object is null
//           if (!auth.currentUser) {
//             console.log("Current user after sign-out: null");
//           } else {
//             console.log("Current user after sign-out:", auth.currentUser.uid);
//           }
//         });
//       } else {
//         console.log("Current user before sign-out: null");
//       }
//     } else {
//       console.log("Sign-in failed");
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });