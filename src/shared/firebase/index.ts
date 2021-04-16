import firebase from 'firebase/app';
import * as admin from 'firebase-admin';

import 'firebase/auth';
import { config } from './config';

const getAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: config.clientEmail,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: config.projectId,
      }),
    });
  }

  return admin;
};

const getFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: config.projectId,
    });
  }

  return firebase;
};

export const firebaseAdminAuth = (): admin.auth.Auth => getAdmin().auth();

export const firebaseAuth = (): firebase.auth.Auth => getFirebase().auth();
