import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyAjbFB3CmPSX1zD_NV9AbKw3SU-l9-nCqo',
  authDomain: 'chat-web-app-sdev.firebaseapp.com',
  projectId: 'chat-web-app-sdev',
  storageBucket: 'chat-web-app-sdev.appspot.com',
  messagingSenderId: '1089359601188',
  appId: '1:1089359601188:web:6e1e3ec76cfa56f192c2b1',
  databaseURL:
    'https://chat-web-app-sdev-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = Firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = Firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BOw7hQXpkYn6gKWk-c-MhbGONlhhLbWxsOIkdYJMS4g-SwYTAp_lrRL9TFKb4iw2NtB94KTu3Rm5CHG1qWdaVq8'
  );

  messaging.onMessage(data => {
    console.log(data);
  });
}
