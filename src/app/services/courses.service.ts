import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private fsdb: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.fsdb
      .collection("courses")
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          // map all snapshots to a course array
          return snaps.map((snap) => {
            return <Course>{
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as Course),
            };
          });
        }),
        first()
      );
  }
}
