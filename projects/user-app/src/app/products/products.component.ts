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
    this.Prodapi.create(data).subscribe(res => {
      console.log("result is: " + res);
    });
  }
  submitCategory(data) {
    this.CatApi.create(data).subscribe(res => {
      console.log("added category is" + res.name);
    });
  }
}
