import firebase from "firebase";

export const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

export const database = firebase.firestore();
export const auth = firebase.auth();
export const user = auth.currentUser;

database.settings({
  timestampsInSnapshots: true
});

export const threadsCollection = database.collection("threads");
export const commentsCollection = database.collection("comments");
