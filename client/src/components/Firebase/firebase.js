import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider =new app.auth.GoogleAuthProvider()
  }

  createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithGoogle = ( ) =>
  this.auth.signInWithPopup(this.googleProvider)

  doSignOut = () => this.auth.signOut();
  
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  
}

export default Firebase;
