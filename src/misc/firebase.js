import Firebase from 'firebase/app';
import dotenv from 'dotenv';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { Notification as Toast } from 'rsuite';
import { isLocalhost } from './helpers';

dotenv.config();

const config = process.env.CONFIG || {};

export const fcmVapidKey = process.env.FCM_VAPID_KEY;

const app = Firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('asia-southeast1');

export const messaging = Firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useEmulator('localhost', 5001);
}
