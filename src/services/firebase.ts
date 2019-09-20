import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB8uYIi430DOU63c2OK-kXO7jBk5BUEpGc",
  authDomain: "polling-app-647a9.firebaseapp.com",
  databaseURL: "https://polling-app-647a9.firebaseio.com",
  projectId: "polling-app-647a9",
  storageBucket: "",
  messagingSenderId: "597014963015",
  appId: "1:597014963015:web:6c763811bb1a56bec42262",
};

export class Firebase {
  private store: typeof firebase.firestore;

  constructor() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
  }

  get polls() {
    return this.store().collection("polls");
  }

  get auth() {
    return firebase.auth;
  }
}

export default new Firebase();
