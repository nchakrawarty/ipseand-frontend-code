import { Component, OnInit } from "@angular/core";

import { LoopBackConfig } from "../../app/shared/sdk/lb.config";
import { ProductApi } from "../../app/shared/sdk/services/custom/Product";
import { CategoryApi } from "../../app/shared/sdk/services/custom/Category";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  constructor(
    public Prodapi: ProductApi,
    public CatApi: CategoryApi,
    private http: HttpClient
  ) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:3000");
    // LoopBackConfig.setBaseURL(
    //   "http://apiipseand-env.mrq37cqjnn.us-east-1.elasticbeanstalk.com"
    // );
  }
  allCategory = [{}];
  products = [{}];
  selectedcat = [];
  ngOnInit() {
    this.Prodapi.find().subscribe(
      res => {
        this.products = res;
        console.log("res", this.products);
      },
      err => {
        console.log(err);
      }
    );
    this.CatApi.find().subscribe(res => {
      this.allCategory = res;
      console.log("Categories are: ", res);
    });

    console.log(location);

    this.http
      .get(
        location.protocol +
          "//" +
          location.hostname +
          ":3000/api/categories/5d52c020d637295bfc76c216/proCat"
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  onClickDel(data) {
    this.Prodapi.deleteById(data.id).subscribe(
      res => {
        console.log("res", this.products);
      },
      err => {
        console.log(err);
      }
    );
    this.Prodapi.find().subscribe(
      res => {
        this.products = res;
        console.log("res", this.products);
      },
      err => {
        console.log(err);
      }
    );
  }
  onClickSubmit(data) {
    console.log(data);
    data.dimension = [data.length, data.width];
    data.categoryId = this.selectedcat;
    // this.Prodapi.create(data).subscribe(res => {
    //   console.log("result is: " + res);
    // });
    for (var i = 0; i < data.categoryId.length; i++) {
      var catId = data.categoryId[i];
      this.http
        .post(
          location.protocol +
            "//" +
            location.hostname +
            ":3000/api/categories/" +
            catId +
            "/proCat",
          data
        )
        .subscribe(res => {
          console.log(res);
        });
    }

    // this.Prodapi.CategoryApi.create({ id: data.categoryId[0] }, data).subscribe(
    //   res => {
    //     console.log("result" + res);
    //   }
    // );
  }
  submitCategory(data) {
    this.CatApi.create(data).subscribe(res => {
      console.log("added category is" + res.name);
    });
  }
  onClickDelCat(data) {
    this.CatApi.deleteById(data).subscribe(
      res => {
        console.log("res", res);
      },
      err => {
        console.log(err);
      }
    );
  }

  showCatSel(data) {
    var indexOfEntry = this.selectedcat.indexOf(data);
    if (indexOfEntry < 0) {
      this.selectedcat.push(data);
    } else {
      this.selectedcat.splice(indexOfEntry, 1);
    }
    console.log("Cat", this.selectedcat);
    this.http
      .get(
        location.protocol +
          "//" +
          location.hostname +
          ":3000/api/categories/" +
          this.selectedcat[0] +
          "/proCat"
      )
      .subscribe(res => {
        console.log(res);
        // this.products = res;
      });
  }
  selectedCat(data) {
    console.log("hi" + data);
    this.http
      .get(
        location.protocol +
          "//" +
          location.hostname +
          ":3000/api/categories/" +
          data +
          "/proCat"
      )
      .subscribe(res => {
        console.log(res);
        this.products = res as any;
      });
  }
}
