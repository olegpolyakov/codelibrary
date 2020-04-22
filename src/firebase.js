import { initializeApp, firestore, auth } from 'firebase';

initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'codelibrary-47708.firebaseapp.com',
    databaseURL: 'https://codelibrary-47708.firebaseio.com',
    projectId: 'codelibrary-47708',
    storageBucket: 'codelibrary-47708.appspot.com',
    messagingSenderId: '212510535763',
    appId: '1:212510535763:web:561c6f91929c2663d856a6',
    measurementId: 'G-Y0XWSFBXDR'
});

const db = firestore();
const auth = auth();

export { db, auth };