import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, first } from "rxjs/operators";
import { convertSnaps } from "./db-utils";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private fsdb: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    /////////////////////////////////////////////////////////////////
    // // start of video 3.5

    // return this.fsdb
    //   .collection("courses")
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );
    // // end of video 3.5
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.6

    // // query collection, sort courses by seqNo
    // return this.fsdb
    //   .collection("courses", (ref) => ref.orderBy("seqNo"))
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // get courses where seqNo == 2
    // return this.fsdb
    //   .collection("courses", (ref) => ref.where("seqNo", "==", 2))
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // get courses where seqNo > 2 and seqNo <= 5
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.where("seqNo", ">", 0).where("seqNo", "<=", 5)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // get courses where seqNo >= 0 and seqNo <= 5, alternate way
    // return this.fsdb
    //   .collection("courses", (ref) => ref.orderBy("seqNo").startAt(0).endAt(5))
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // get courses where seqNo > 0 and seqNo <= 5, alternate way
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.orderBy("seqNo").startAfter(0).endAt(5)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // get beginner courses only
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.where("categories", "array-contains", "BEGINNER")
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // // query collection, sort courses by seqNo
    // return this.fsdb
    //   .collection("courses", (ref) => ref.orderBy("seqNo"))
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // end of video 3.6
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.7

    // // sample compound query, seqNo == 5 && lessonsCount >= 5
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.where("seqNo", "==", 5).where("lessonsCount", ">=", 5)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // end of video 3.7
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.8

    // sample compound query that throws an error
    // seqNo >= 5 && lessonsCount >= 5
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.where("seqNo", ">=", 5).where("lessonsCount", ">=", 5)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // sample compound query that works
    // seqNo >= 5 && seqNo <= 10
    // return this.fsdb
    //   .collection("courses", (ref) =>
    //     ref.where("seqNo", ">=", 5).where("seqNo", "<=", 10)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map((snaps) => {
    //       // map all snapshots to a course array
    //       return snaps.map((snap) => {
    //         return <Course>{
    //           id: snap.payload.doc.id,
    //           ...(snap.payload.doc.data() as Course),
    //         };
    //       });
    //     }),
    //     first()
    //   );

    // note that the following 2 queries will each need their own separate indexes
    // seqNo == 5 && lessonsCount >= 5
    // seqNo >= 5 && lessonsCount == 5

    // end of video 3.8
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.10

    // query collection, sort courses by seqNo
    return this.fsdb
      .collection("courses", (ref) => ref.orderBy("seqNo"))
      .snapshotChanges()
      .pipe(
        map((snaps) => convertSnaps<Course>(snaps)),
        first()
      );

    // end of video 3.10
    /////////////////////////////////////////////////////////////////
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.fsdb
      .collection("courses", (ref) => ref.where("url", "==", courseUrl))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const courses = convertSnaps<Course>(snaps);
          return courses.length == 1 ? courses[0] : undefined;
        }),
        first()
      );
  }
}
