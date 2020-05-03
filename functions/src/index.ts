import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

///////////////////////////////////////////////////////////////////////////////
// start of video 8.1

export const helloWorld = functions.https.onRequest((request, response) => {
  //  response.send("Hello from Firebase!");
  response.status(200).json({ message: "Hello World" });
});

// end of video 8.1
///////////////////////////////////////////////////////////////////////////////

