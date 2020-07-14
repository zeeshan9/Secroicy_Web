const firebase = require("firebase-admin");

const credentials = require("./firebase-credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),

  apiKey: "AIzaSyCavGH7jsmnEmN6eOTogCCb3azZWxzXzgM",
  authDomain: "secroicy-b5ba8.firebaseapp.com",
  databaseURL: "https://secroicy-b5ba8.firebaseio.com",
  projectId: "secroicy-b5ba8",
  storageBucket: "secroicy-b5ba8.appspot.com",
  messagingSenderId: "91410621532",
  appId: "1:91410621532:web:1b861498b16db1d59af299",

  // apiKey: "AIzaSyBEyiqC6eBwIk6PvcpWGmuy_touOvULBKM",
  // authDomain: "secroicy-27f10.firebaseapp.com",
  // databaseURL: "https://secroicy-27f10.firebaseio.com",
  // projectId: "secroicy-27f10",
  // storageBucket: "secroicy-27f10.appspot.com",
  // messagingSenderId: "412287384599",
  // appId: "1:412287384599:web:21b340069598d673aab052",
});

module.exports = firebase;
