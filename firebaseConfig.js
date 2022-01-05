import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ7oOqdAVttihA3hB19KogVIPp0wlV6kI",
  authDomain: "delivery-ecomerce-template.firebaseapp.com",
  projectId: "delivery-ecomerce-template",
  storageBucket: "delivery-ecomerce-template.appspot.com",
  messagingSenderId: "1862259395",
  appId: "1:1862259395:web:e16a11af0646e5a8afc876",
  measurementId: "G-LR6DH4KLP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app)

export {db, storage}