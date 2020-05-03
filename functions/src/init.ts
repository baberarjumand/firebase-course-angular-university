
const admin = require('firebase-admin');

 admin.initializeApp();

 export const fsdb = admin.firestore();
 