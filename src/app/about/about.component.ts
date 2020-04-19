import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as fb from "firebase/app";
import "firebase/firestore";
import { Course } from "../model/course";
import { environment } from "../../environments/environment";
import { AngularFirestore } from "@angular/fire/firestore";
import { of } from "rxjs";

// // my public db creds
// const config = {
//   apiKey: "AIzaSyBN-2nngePTAxS37o2BcmLDH4a-tGGybEg",
//   authDomain: "udemy-fireb-angularunicourse.firebaseapp.com",
//   databaseURL: "https://udemy-fireb-angularunicourse.firebaseio.com",
//   projectId: "udemy-fireb-angularunicourse",
//   storageBucket: "udemy-fireb-angularunicourse.appspot.com",
//   messagingSenderId: "852862296693",
//   appId: "1:852862296693:web:3a14fc2297486ac8e08e3c",
//   measurementId: "G-3MPGWWX4EF",
// };
// fb.initializeApp(config);
// fb.initializeApp(environment.firebase);
// const db = fb.firestore();
// // const settings = { timestampsInSnapshots: true };
// // db.settings(settings);

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private fsdb: AngularFirestore) {}

  ngOnInit() {
    /////////////////////////////////////////////////////////////////
    // start of video 2.3
    //
    // db.doc("courses/wHs2CQZRPq9iMmA9T5Ja")
    //   .get()
    //   .then((snap) => console.log(snap.data()));
    //
    // end of video 2.3
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 2.4
    //
    // get courses collection with metadata
    // db.collection("courses")
    //   .get()
    //   .then((snaps) => console.log(snaps));
    //
    // get array of courses
    // db.collection("courses")
    //   .get()
    //   .then((snaps) => {
    //     console.log(snaps.docs.map((snap) => snap.data()));
    //   });
    //
    // get all course ids
    // db.collection("courses")
    //   .get()
    //   .then((snaps) => {
    //     console.log(snaps.docs.map((snap) => snap.id));
    //   });
    //
    // get courses with ids
    // db.collection("courses")
    //   .get()
    //   .then((snaps) => {
    //     const courses: Course[] = snaps.docs.map((snap) => {
    //       return <Course>{
    //         id: snap.id,
    //         ...snap.data(),
    //       };
    //     });
    //     console.log(courses);
    //   });
    //
    // end of video 2.4
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.2
    //
    // valueChanges() is a live observable that emits a new value
    //  anytime a change is made to any document in db
    // valueChanges() is good for reading and displaying data,
    //  but not suitable if we want to edit a doc
    // for that purpose, we use snapshotChanges()
    // valueChanges() is a live observable, and it does not complete
    // //
    // // get all courses as an array, without ids
    // this.fsdb
    //   .collection("courses")
    //   .valueChanges()
    //   .subscribe((val) => console.log(val));
    // //
    // end of video 3.2
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.3
    //
    // snapshotChanges() returns a snapshot object, which contains a
    //  type and a payload
    // type is a string and one of 3 values: added, removed, modified
    // payload contains the doc from the collection we are querying
    // payload has a doc property, in which we can get doc id and data
    // snapshotChanges(), like valueChanges() is also a live connection
    //  to the db, where changes to db are emitted in real-time,
    //  it emits one new value containing the whole state of collection
    // unlike valueChanges(), we receive a complete snapshot (with other metadata)
    //  instead of only the values, incl. the doc ids
    // //
    // // use snapshotChanges() to get courses with ids
    // this.fsdb
    //   .collection("courses")
    //   .snapshotChanges()
    //   .subscribe((snaps) => {
    //     // map all snapshots to a course array
    //     const courses: Course[] = snaps.map((snap) => {
    //       return <Course>{
    //         id: snap.payload.doc.id,
    //         ...(snap.payload.doc.data() as Course),
    //       };
    //     });
    //     console.log(courses);
    //   });
    //
    // another observable method to query collections is stateChanges()
    // we get back a similar object to the one we got from snapshotChanges()
    // there is a type and a payload property, payload contains the id and data
    // however, unlike snapshotChanges(), stateChanges() is not going to give
    //  us back the complete collection each time a modification is made to db data
    // when a change in data is made, we don't get back an array with all docs
    //  in collection, we only get one element with type MODIFIED, and the payload
    //  with the doc id and the new modified data
    // snapshotChanges() always return the complete current state of the collection
    // stateChanges() only returns the doc that was modified
    // if we had a 1000 courses, snapshotChanges() would return a 1000 courses even
    //  if any single course is modified
    // stateChanges() is ideal if we want to keep an in-memory database on client
    //  in sync with the database
    // stateChanges() gives us back incremental changes after the first subscribe
    //
    // // use stateChanges() to fetch courses collection
    // this.fsdb
    //   .collection("courses")
    //   .stateChanges()
    //   .subscribe((snaps) => {
    //     console.log(snaps);
    //     // // map all snapshots to a course array
    //     // const courses: Course[] = snaps.map((snap) => {
    //     //   return <Course>{
    //     //     id: snap.payload.doc.id,
    //     //     ...(snap.payload.doc.data() as Course),
    //     //   };
    //     // });
    //     // console.log(courses);
    //   });
    // //
    // end of video 3.3
    /////////////////////////////////////////////////////////////////
  }

  batchWriteSave() {
    /////////////////////////////////////////////////////////////////
    // start of video 3.16

    // ref for serverless angular firebase course
    const firebaseCourseRef = this.fsdb.doc("/courses/wHs2CQZRPq9iMmA9T5Ja")
      .ref;

    const angDeepDiveCourseRef = this.fsdb.doc("/courses/joJyboMT3aXmY4aLW17C")
      .ref;

    const batch = this.fsdb.firestore.batch();

    batch.update(firebaseCourseRef, {
      titles: {
        description: "Firebase Course",
      },
    });

    batch.update(angDeepDiveCourseRef, {
      titles: {
        description: "Angular Deep Dive Course",
      },
    });

    const batch$ = of(batch.commit());
    batch$.subscribe();

    // end of video 3.16
    /////////////////////////////////////////////////////////////////
  }

  async runTransaction() {
    /////////////////////////////////////////////////////////////////
    // start of video 3.17

    const newCounter = await this.fsdb.firestore.runTransaction(
      async (transaction) => {
        console.log("Running transaction...");

        // ref to serverless angular firebase course
        const courseRef = this.fsdb.doc("/courses/wHs2CQZRPq9iMmA9T5Ja").ref;

        const snap = await transaction.get(courseRef);

        const course = <Course>snap.data();

        const newLessonsCount = course.lessonsCount + 1;

        transaction.update(courseRef, { lessonsCount: newLessonsCount });

        return newLessonsCount;
      }
    );

    console.log("result lessons count = ", newCounter);

    // end of video 3.17
    /////////////////////////////////////////////////////////////////
  }
}
