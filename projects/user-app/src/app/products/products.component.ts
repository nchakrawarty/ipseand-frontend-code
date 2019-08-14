import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "../../app/shared/sdk/lb.config";
import { ProductApi } from "../shared/sdk/services/custom/Product";
import { CategoryApi } from "../shared/sdk/services/custom/Category";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(public Prodapi: ProductApi, public CatApi: CategoryApi) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:8086");
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
  }
  onClickSubmit(data) {
    console.log(data);
    data.dimension = [data.length, data.width];
    data.categoryId = this.selectedcat;
    this.Prodapi.create(data).subscribe(res => {
      console.log("result is: " + res);
    });
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
  }
}
