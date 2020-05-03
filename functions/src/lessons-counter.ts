import * as functions from "firebase-functions";
import { fsdb } from "./init";

function courseTransaction(snap, callBack: Function) {
  return fsdb.runTransaction(async (transaction) => {
    const courseRef = snap.ref.parent.parent;

    const courseSnap = await transaction.get(courseRef);

    const course = courseSnap.data();

    const changes = callBack(course);

    transaction.update(courseRef, changes);
  });
}

export const onAddLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonsId}")
  .onCreate(async (snap, context) => {
    // const courseId = context.params.courseId;

    console.log("Running onAddLesson trigger...");

    return courseTransaction(snap, (course) => {
      return { lessonsCount: (course.lessonsCount || 0) + 1 };
    });
  });

export const onDeleteLesson = functions.firestore
  .document("courses/{courseId}/lessons/{lessonsId}")
  .onDelete(async (snap, context) => {
    // const courseId = context.params.courseId;

    console.log("Running onDeleteLesson trigger...");

    return courseTransaction(snap, (course) => {
      return { lessonsCount: (course.lessonsCount || 0) - 1 };
    });
  });
