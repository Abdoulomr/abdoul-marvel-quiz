import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD2VPPHV_-S9plwfkNm2mN6n-0OByWAbqU",
    authDomain: "marvel-quiz-aba81.firebaseapp.com",
    projectId: "marvel-quiz-aba81",
    storageBucket: "marvel-quiz-aba81.appspot.com",
    messagingSenderId: "849225281211",
    appId: "1:849225281211:web:47b185d83230e7ca66039e"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export const firestore = getFirestore();

  export const user = uid => doc(firestore, `users/${uid}`);

