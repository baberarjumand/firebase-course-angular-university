import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { last, concatMap } from "rxjs/operators";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  course: Course;
  uploadProgress$: Observable<number>;
  // downloadUrl$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService,
    private afStorage: AngularFireStorage
  ) {
    this.course = course;
    const titles = course.titles;

    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    /////////////////////////////////////////////////////////////////
    // start of video 3.13

    const changes = this.form.value;
    this.coursesService
      .saveCourse(this.course.id, { titles: changes })
      .subscribe(() => this.dialogRef.close(this.form.value));

    // end of video 3.13
    /////////////////////////////////////////////////////////////////
    // this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  uploadFile(event) {
    /////////////////////////////////////////////////////////////////
    // start of video 7.2, 7.3, 7.4, 7.5

    const file: File = event.target.files[0];

    const filePath = `courses/${this.course.id}/${file.name}`;

    const task = this.afStorage.upload(filePath, file);

    this.uploadProgress$ = task.percentageChanges();

    // temporarily removing downloadUrl$ to test resizeThumbnail() cloud function
    //  in video 8.10
    // this.downloadUrl$ = task.snapshotChanges().pipe(
    //   last(),
    //   concatMap(() => this.afStorage.ref(filePath).getDownloadURL())
    // );

    // const saveUrl$ = this.downloadUrl$.pipe(
    //   concatMap((url) =>
    //     this.coursesService.saveCourse(this.course.id, {
    //       uploadedImageUrl: url,
    //     })
    //   )
    // );

    // saveUrl$.subscribe(console.log);

    // end of video 7.2, 7.3, 7.4, 7.5
    /////////////////////////////////////////////////////////////////
  }
}
