/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyAjbFB3CmPSX1zD_NV9AbKw3SU-l9-nCqo',
  authDomain: 'chat-web-app-sdev.firebaseapp.com',
  projectId: 'chat-web-app-sdev',
  storageBucket: 'chat-web-app-sdev.appspot.com',
  messagingSenderId: '1089359601188',
  appId: '1:1089359601188:web:6e1e3ec76cfa56f192c2b1',
  databaseURL:
    'https://chat-web-app-sdev-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

const messaging = firebase.messaging();
