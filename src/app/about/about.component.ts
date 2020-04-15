import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as fb from "firebase/app";
import "firebase/firestore";
import { Course } from "../model/course";
import { environment } from "../../environments/environment";
import { AngularFirestore } from "@angular/fire/firestore";

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

    // get all courses as an array, without ids
    this.fsdb
      .collection("courses")
      .valueChanges()
      .subscribe((val) => console.log(val));

    // end of video 3.2
    /////////////////////////////////////////////////////////////////
  }
}
