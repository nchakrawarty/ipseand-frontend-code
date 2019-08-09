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
  constructor(public api: UserProfileApi) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:3000");
    // LoopBackConfig.setApiVersion("api");
  }
  users = [{}];
  title = "user-app";
  firstName = "";
  lastName;
  // id = "5d4a987a6ca1e75cc4a3ab55";
  ngOnInit() {
    this.api.find().subscribe(
      res => {
        this.users = res;
        console.log("res", res, this.users);
      },
      err => {
        console.log(err);
      }
    );
  }
  onClickSubmit(data) {
    console.log(
      "First Name: " +
        data.firstName +
        ", Last Name: " +
        data.lastName +
        ", EmailId: " +
        data.email +
        ", Contact Num: " +
        data.primaryContactNum +
        ", Address: " +
        data.address +
        data.secondaryPhone
    );
    data.address = [{ "first Line": data.address }];
    this.api.create(data).subscribe(res => {
      console.log("result is: " + res);
    });
  }
}
