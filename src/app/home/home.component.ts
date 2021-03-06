import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    /////////////////////////////////////////////////////////////////
    // start of video 3.4

    // this.courses$ = this.fsdb
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
    //     })
    //   );

    // this.beginnerCourses$ = this.courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.categories.includes("BEGINNER"))
    //   )
    // );

    // this.advancedCourses$ = this.courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.categories.includes("ADVANCED"))
    //   )
    // );

    // end of video 3.4
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.5

    // this.courses$ = this.coursesService.loadAllCourses();

    // this.beginnerCourses$ = this.courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.categories.includes("BEGINNER"))
    //   )
    // );

    // this.advancedCourses$ = this.courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.categories.includes("ADVANCED"))
    //   )
    // );

    // end of video 3.5
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // start of video 3.14

    this.reloadCourses();

    // end of video 3.14
    /////////////////////////////////////////////////////////////////
  }

  reloadCourses() {
    this.courses$ = this.coursesService.loadAllCourses();

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
  }
}
