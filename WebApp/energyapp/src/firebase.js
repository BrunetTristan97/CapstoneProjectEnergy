import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBVkqaFCu5rnlbz6uiFB537k2g_RprEfAA",
  authDomain: "energyapp-4d5b4.firebaseapp.com",
  projectId: "energyapp-4d5b4",
  storageBucket: "energyapp-4d5b4.appspot.com",
  messagingSenderId: "679023120304",
  appId: "1:679023120304:web:c9084ac0d0641b95485075"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();

export default app;