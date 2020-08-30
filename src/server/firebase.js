import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyC30yK0dmMf6vdQ2odJjHjIYXBdgcD3ufc",
  authDomain: "slack-react-clone-64dbf.firebaseapp.com",
  databaseURL: "https://slack-react-clone-64dbf.firebaseio.com",
  projectId: "slack-react-clone-64dbf",
  storageBucket: "slack-react-clone-64dbf.appspot.com",
  messagingSenderId: "549550707301",
  appId: "1:549550707301:web:0c909f1b552f1cc319ec8c",
  measurementId: "G-778T1BBFQ3"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;