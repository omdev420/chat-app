import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();
const config = process.env.CONFIG;

const app = Firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
