import * as functions from "firebase-functions";
import { fsdb } from "./init";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

///////////////////////////////////////////////////////////////////////////////
// start of video 8.1

// export const helloWorld = functions.https.onRequest((request, response) => {
//   //  response.send("Hello from Firebase!");
//   response.status(200).json({ message: "Hello World" });
// });

// end of video 8.1
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// start of video 8.2

// // const express = require("express");
// import * as express from "express";
// const cors = require("cors");

// const app = express();

// app.use(
//   cors({
//     origin: true,
//   })
// );

// app.get("/courses", async (request, response) => {
//   const snaps = await fsdb.collection("courses").get();

//   const courses: any = [];

//   snaps.forEach((snap: any) => courses.push(snap.data()));

//   response.status(200).json({ courses });
// });

// export const getCourses = functions.https.onRequest(app);

// end of video 8.2
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// start of video 8.3

// const express = require("express");
import * as express from "express"; // this declaration is more type-safe
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.get("/courses", async (request, response) => {
  const snaps = await fsdb.collection("courses").get();

  const courses: any[] = [];

  snaps.forEach((snap: any) => courses.push(snap.data()));

  response.status(200).json({ courses });
});

export const getCourses = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
  //  response.send("Hello from Firebase!");
  response.status(200).json({ message: "Hello World" });
});

// end of video 8.3
///////////////////////////////////////////////////////////////////////////////
