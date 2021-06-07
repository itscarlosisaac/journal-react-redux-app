import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJWlc9mEA0gGoQT7vM9Bhe3om6YApvZ2g",
  authDomain: "react-redux-journal-d253a.firebaseapp.com",
  projectId: "react-redux-journal-d253a",
  storageBucket: "react-redux-journal-d253a.appspot.com",
  messagingSenderId: "429802086700",
  appId: "1:429802086700:web:67c512113470d3e0424c89"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export  {
  db,
  googleAuthProvider,
  firebase
}