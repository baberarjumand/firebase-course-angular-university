import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private fsdb: AngularFirestore) {}

  ngOnInit() {
    /////////////////////////////////////////////////////////////////
    // start of video 3.4

    this.courses$ = this.fsdb
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
        })
      );

    this.beginnerCourses$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.categories.includes("BEGINNER"))
      )
    );

    this.advancedCourses$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.categories.includes("ADVANCED"))
      )
    );

    // end of video 3.4
    /////////////////////////////////////////////////////////////////
  }
}
