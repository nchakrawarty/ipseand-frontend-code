import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "../../app/shared/sdk/lb.config";
import { ProductApi } from "../../app/shared/sdk/services/custom/Product";
import { CategoryApi } from "../../app/shared/sdk/services/custom/Category";
import { HttpClient } from "@angular/common/http";
import { CartComponent } from "../cart/cart.component";
declare var $ :any;

import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  vals="";
  sws:any;
  constructor(
    private router: Router,
    public Prodapi: ProductApi,
    public CatApi: CategoryApi,
    private http: HttpClient
  ) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:8086");
    // LoopBackConfig.setBaseURL(
    //   "http://apiipseand-env.mrq37cqjnn.us-east-1.elasticbeanstalk.com"
    // );
  }
  port = "8086/api/";
  allCategory = [{}];
  products = [{}];
  selectedcat = [];

  editProduct = [{}];

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

    // this.http
    //   .get(
    //     location.protocol +
    //       "//" +
    //       location.hostname +
    //       ":3000/api/categories/5d52c020d637295bfc76c216/categoryProducts"
    //   )
    //   .subscribe(res => {
    //     console.log(res);
    //   });
  }

  onClickDel(data) {
    // this.Prodapi.deleteById(data.id).subscribe(
    //   res => {
    //     console.log("res", this.products);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.http
      .delete(
        location.protocol +
          "//" +
          location.hostname +
          ":3000/api/categories/" +
          data.categoryId +
          "/categoryProducts"
      )
      .subscribe(res => {
        console.log(res);
        this.Prodapi.deleteById(data.id).subscribe(
          res => {
            console.log("res", this.products);
          },
          err => {
            console.log(err);
          }
        );
      });

    this.Prodapi.find().subscribe(
      res => {
        this.products = res;
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

    // http://localhost:3000/api/categories/5d56785e361004406c5b0abe/categoryProducts
  }
  searchForm (evn) {
    if(evn.key !== "Backspace"){
      if( (evn.key.match(/[a-z]/i) || evn.key.match(/[A-Z]/i) || evn.key.match(/[0-9]/i))) {
        this.vals += evn.key;
      }
    }
    else {
      this.vals = this.vals.slice(0, -1);
    }
    var value = this.vals;
    var regex = new RegExp(this.vals, "i");
            var output = '<div class="row">';
            var count = 1;
            var items=[];
	  $.each(this.products, function(key, val){
		if ((val.name.search(regex) != -1)||(val.brand.search(regex) != -1)) {
      // this.items.push("hellow");
      items.push(val);
	  // output += '<div class="col-md-6 well">';
	  // output += '<div class="col-md-3"></div>';
	  // output += '<div class="col-md-7">';
	  // output += '<h5>' + val.brand + '</h5>';
	  // output += '<p>' + val.name + '</p>'
	  // output += '</div>';
	  // output += '</div>';
	  // if(count%2 == 0){
		// output += '</div><div class="row">'
	  // }
	  count++;
    }
    console.log(items);
    // console.log(this.searchValueArray);
    });
    this.sws = items;
	  output += '</div>';
	  $('#filter-records').html(output);
  }
  onClickSubmit(data) {
    console.log(data);
    data.dimension = [data.length, data.width];
    
//     data.categoryId = this.selectedcat;
    data.createDate = new Date();
    // data.categoryId = this.selectedcat;
    // this.Prodapi.create(data).subscribe(res => {
    //   console.log("result is: " + res);
    // });
    for (var i = 0; i < this.selectedcat.length; i++) {
      var catId = this.selectedcat[i];
      data.categoryId = this.selectedcat[i];
      this.http
        .post(
          location.protocol +
            "//" +
            location.hostname +
            ":"+this.port+"categories/" +
            catId +
            "/categoryProducts",
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
          ":"+this.port+"categories/" +
          this.selectedcat[0] +
          "/categoryProducts"
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
          ":"+this.port+"categories/" +
          data +
          "/categoryProducts"
      )
      .subscribe(res => {
        console.log(res);
        this.products = res as any;
      });
  }

  addToCart(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": id
      }
  };
  this.router.navigateByUrl('/cart', { state: { id: id } });
    //  this.router.navigate(['/cart'], navigationExtras);
  }
  editproduct(data) {
    document.getElementById("editform").style.display = "block";
    this.editProduct = data;
    console.log(this.editProduct);
  }
  closeform() {
    document.getElementById("editform").style.display = "none";
  }
  onClickSave(data) {
    console.log(data.id);
    this.Prodapi.replaceById(data.id, data).subscribe(res => {
      console.log(data);
    });
  }
  // onClickDelCat(data) {
  //   this.CatApi.deleteById(data).subscribe(
  //     res => {
  //       console.log("res", res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // showCatSel(data) {
  //   var indexOfEntry = this.selectedcat.indexOf(data);
  //   if (indexOfEntry < 0) {
  //     this.selectedcat.push(data);
  //   } else {
  //     this.selectedcat.splice(indexOfEntry, 1);
  //   }
  //   console.log("Cat", this.selectedcat);
  //   this.http
  //     .get(
  //       location.protocol +
  //         "//" +
  //         location.hostname +
  //         ":3000/api/categories/" +
  //         this.selectedcat[0] +
  //         "/categoryProducts"
  //     )
  //     .subscribe(res => {
  //       console.log(res);
  //       // this.products = res;
  //     });
  // }
  // selectedCat(data) {
  //   console.log("hi" + data);
  //   this.http
  //     .get(
  //       location.protocol +
  //         "//" +
  //         location.hostname +
  //         ":3000/api/categories/" +
  //         data +
  //         "/categoryProducts"
  //     )
  //     .subscribe(res => {
  //       console.log(res);
  //       this.products = res as any;
  //     });
  // }
}
