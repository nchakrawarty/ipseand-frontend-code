import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "../../app/shared/sdk/lb.config";
import { ProductApi } from "../../app/shared/sdk/services/custom/Product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(public api: ProductApi) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:3000");
  }
  products = [{}];
  ngOnInit() {
    this.api.find().subscribe(
      res => {
        this.products = res;
        console.log("res", this.products);
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickDel(data) {
    this.api.deleteById(data.id).subscribe(
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
    this.api.create(data).subscribe(res => {
      console.log("result is: " + res);
    });
  }
}
