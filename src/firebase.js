import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyCclahYHw8G7iCoZNNKCME4-tJTYj_v8L0",
  authDomain: "filfull.firebaseapp.com",
  projectId: "filfull",
});

const db = firebase.firestore();
const auth = process.env.NODE_ENV === "test" ? { onAuthStateChanged: () => {} } : firebase.auth();

if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
  auth?.useEmulator?.("http://localhost:9099/", { disableWarnings: true });
}

export default firebase;
export { auth, db };
