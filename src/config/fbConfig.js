import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import { database } from 'firebase'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
var config = {
    apiKey: "AIzaSyBEq7ZI2aO4Movu1_tcHs8H7jOBsoP5CpY",
    authDomain: "mk-app-3a36e.firebaseapp.com",
    databaseURL: "https://mk-app-3a36e.firebaseio.com",
    projectId: "mk-app-3a36e",
    storageBucket: "mk-app-3a36e.appspot.com",
    messagingSenderId: "28284048932",
    appId: "1:28284048932:web:e4c0547b0f85d04c81eab1",
    measurementId: "G-SY0WPDEN47"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
firebase.firestore()
  
  

  export default  firebase;