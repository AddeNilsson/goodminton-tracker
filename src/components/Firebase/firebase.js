import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    // app.analytics();
    this.auth = app.auth();
    this.db = app.database();
  }

  /* Auth API */
  createUserWithEmailAndPsw = (email, psw) => (
    this.auth.createUserWithEmailAndPassword(email, psw)
  );

  signInWithEmailAndPsw = (email, psw) => this.auth.signInWithEmailAndPassword(email, psw);

  signOut = () => this.auth.signOut();

  pswReset = email => this.auth.sendPasswordResetEmail(email);

  pswUpdate = password => this.auth.currentUser.updatePassword(password)

  /* Users API */
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  /* Log API */
  log = uid => this.db.ref(`logs/${uid}`);

  logs = () => this.db.ref('logs');
}

export default Firebase;
