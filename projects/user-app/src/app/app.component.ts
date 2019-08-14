import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "../app/shared/sdk/lb.config";
import { FormsModule } from "@angular/forms";
import { UserProfileApi } from "../app/shared/sdk/services/custom/UserProfile";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
