import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as fb from "firebase/app";
import "firebase/firestore";

// my public db creds
const config = {
  apiKey: "AIzaSyBN-2nngePTAxS37o2BcmLDH4a-tGGybEg",
  authDomain: "udemy-fireb-angularunicourse.firebaseapp.com",
  databaseURL: "https://udemy-fireb-angularunicourse.firebaseio.com",
  projectId: "udemy-fireb-angularunicourse",
  storageBucket: "udemy-fireb-angularunicourse.appspot.com",
  messagingSenderId: "852862296693",
  appId: "1:852862296693:web:3a14fc2297486ac8e08e3c",
  measurementId: "G-3MPGWWX4EF",
};

fb.initializeApp(config);
const db = fb.firestore();
// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    db.doc("courses/wHs2CQZRPq9iMmA9T5Ja")
      .get()
      .then((snap) => console.log(snap.data()));
  }
}
