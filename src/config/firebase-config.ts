import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBP8rM_J7HgTj4sqErgxLhfffqrc0QX19U",
    authDomain: "maps-ea375.firebaseapp.com",
    projectId: "maps-ea375",
    storageBucket: "maps-ea375.appspot.com",
    messagingSenderId: "898873341749",
    appId: "1:898873341749:web:f7726aeffa46a594e83e7c"
};


const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);