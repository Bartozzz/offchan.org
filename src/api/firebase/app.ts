import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
// import "firebase/database";
// import "firebase/messaging";

export const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

export const database = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const user = auth.currentUser;
