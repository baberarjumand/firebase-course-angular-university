const admin = require("firebase-admin");

// make sure you generate your own Firebase Admin SDK private key from:
//  Firebase Console -> Project Settings -> Service Accounts -> Generate Private Key
// const serviceAccount = require("./serviceAccountKey/serviceAccountKey.json");
import * as data from "./serviceAccountKey/serviceAccountKey.json";
const serviceAccount = (<any>data).serviceAccountKey;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://udemy-fireb-angularunicourse.firebaseio.com",
});

export const fsdb = admin.firestore();
