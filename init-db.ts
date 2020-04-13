
import {COURSES, findLessonsForCourse} from './db-data';

import * as firebase from 'firebase';

// old config from course author
// var config = {
//     apiKey: "AIzaSyDNPCbN20dZrAbGChRjyBSDmu2uRiPyBMk",
//     authDomain: "test-a6f61.firebaseapp.com",
//     databaseURL: "https://test-a6f61.firebaseio.com",
//     projectId: "test-a6f61",
//     storageBucket: "test-a6f61.appspot.com",
//     messagingSenderId: "24603706805"
// };

// my public db creds
var config = {
  apiKey: "AIzaSyBN-2nngePTAxS37o2BcmLDH4a-tGGybEg",
  authDomain: "udemy-fireb-angularunicourse.firebaseapp.com",
  databaseURL: "https://udemy-fireb-angularunicourse.firebaseio.com",
  projectId: "udemy-fireb-angularunicourse",
  storageBucket: "udemy-fireb-angularunicourse.appspot.com",
  messagingSenderId: "852862296693",
  appId: "1:852862296693:web:3a14fc2297486ac8e08e3c",
  measurementId: "G-3MPGWWX4EF"
};

console.log("Uploading data to the database with the following config:\n");

console.log(JSON.stringify(config));

console.log("\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n");

firebase.initializeApp(config);

const db = firebase.firestore();

async function uploadData() {

  var batch = db.batch();

  const courses = db.collection('courses');


  Object.values(COURSES)
    .sort((c1:any, c2:any) => c1.seqNo - c2.seqNo)
    .forEach(async (course:any) => {

      const newCourse = removeId(course);

      const courseRef = await courses.add(newCourse);

      const lessons = courseRef.collection("lessons");

      const courseLessons = findLessonsForCourse(course.id);

      //console.log(`Adding ${courseLessons.length} lessons to ${course.description}`);

      courseLessons.forEach(async lesson => {

        const newLesson = removeId(lesson);

        await lessons.add(newLesson);

      });

    });

  return batch.commit();
}


function removeId(data:any) {

  const newData: any = {...data};

  delete newData.id;

  return newData;
}


uploadData()
  .then(() => {
    console.log("Writing data, exiting in 10 seconds ...\n\n");

    setTimeout(() => {

      console.log("\n\n\nData Upload Completed.\n\n\n");
      process.exit(0);

    }, 10000);

  })
  .catch(err => {
    console.log("Data upload failed, reason:", err, '\n\n\n');
    process.exit(-1);
  });


