import Firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAjbFB3CmPSX1zD_NV9AbKw3SU-l9-nCqo',
  authDomain: 'chat-web-app-sdev.firebaseapp.com',
  projectId: 'chat-web-app-sdev',
  storageBucket: 'chat-web-app-sdev.appspot.com',
  messagingSenderId: '1089359601188',
  appId: '1:1089359601188:web:6e1e3ec76cfa56f192c2b1',
};

const app = Firebase.initializeApp(config);
