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
  constructor(public userApi: UserProfileApi) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:8086");
    // LoopBackConfig.setApiVersion("api");
  }
  users = [{}];
  title = "user-app";
  firstName = "";
  lastName;
  // id = "5d4a987a6ca1e75cc4a3ab55";
  ngOnInit() {
    this.userApi.find().subscribe(
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
    data.address = [{ firstLine: data.address }];
    this.userApi.create(data).subscribe(res => {
      console.log("result is: " + res);
      data.address = [{}];
    });
  }
  onClickDel(data) {
    console.log(data);
    this.api.deleteById(data.id).subscribe(res => {
      console.log(res);
    });
  }
}
