import * as functions from "firebase-functions";
import { fsdb } from "./init";

export const onAddLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonsId}")
  .onCreate(async (snap, context) => {
    // const courseId = context.params.courseId;

    console.log("Running onAddLesson trigger...");

    return fsdb.runTransaction(async (transaction) => {
      const courseRef = snap.ref.parent.parent;

      const courseSnap = await transaction.get(courseRef);

      const course = courseSnap.data();

      const changes = { lessonsCount: course.lessonsCount + 1 };

      transaction.update(courseRef, changes);
    });
  });
