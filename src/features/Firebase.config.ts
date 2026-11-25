import firebase from "firebase/compat/app"

export const FirebaseConfig = firebase.initializeApp({
  apiKey: import.meta.env.VITE_SECRET_KEY_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
})