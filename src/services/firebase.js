import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZvpHn6mY8zULJdeTa8QuwMMlt5bb1aP0",
  authDomain: "prism-envoys.firebaseapp.com",
  projectId: "prism-envoys",
  storageBucket: "prism-envoys.appspot.com",
  messagingSenderId: "609709205636",
  appId: "1:609709205636:web:eee0484835d4a76385bad1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set up provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Set up auth functions
const auth = firebase.auth();
const login = () => auth.signInWithPopup(googleProvider);
const logout = () => auth.signOut();

// export auth functions
export { auth, login, logout };