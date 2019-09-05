import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "../../app/shared/sdk/lb.config";
import { ProductApi } from "../../app/shared/sdk/services/custom/Product";
import { CategoryApi } from "../../app/shared/sdk/services/custom/Category";
import { SeatsApi } from "../../app/shared/sdk/services/custom/Seats";
import { HttpClient } from "@angular/common/http";
import { CartComponent } from "../cart/cart.component";


import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ContactformServiceService } from '../../../contactform-service.service';

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
  contactForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl()
});
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public Prodapi: ProductApi,
    public CatApi: CategoryApi,
    public seatApi: SeatsApi,
    private http: HttpClient,
    private formService: ContactformServiceService
  ) {
    // LoopBackConfig.setBaseURL("http://127.0.0.1:8086");
    LoopBackConfig.setBaseURL(
      "http://apiipseand-env.mrq37cqjnn.us-east-1.elasticbeanstalk.com"
    );
    this.createForm();
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: ''
    });
}

  port = "8086/api/";
  allCategory = [{}];
  products = [{}];
  selectedcat = [];
  seats = [{}];
  selection = [{
    id: "",
    name: '',
    price: 0,
    row: "",
    status: ""
  }];

  ngOnInit() {
    this.Prodapi.find().subscribe(
      res => {
        this.products = res;
        // console.log("res", this.products);
      },
      err => {
        // console.log(err);
      }
    );
    this.seatApi.find().subscribe(
      res => {
        this.seats = res;
        // console.log("Seat res", this.seats);
      },
      err => {
        // console.log(err);
      }
    );

    this.CatApi.find().subscribe(res => {
      this.allCategory = res;
      // console.log("Categories are: ", res);
    });
    console.log(location);

    this.http
      .get(
        location.protocol +
          "//" +
          location.hostname +
          ":"+this.port+ "categories/5d52c020d637295bfc76c216/proCat"
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
	  output += '<div class="col-md-6 well">';
	  output += '<div class="col-md-3"></div>';
	  output += '<div class="col-md-7">';
	  output += '<h5>' + val.brand + '</h5>';
	  output += '<p>' + val.name + '</p>'
	  output += '</div>';
	  output += '</div>';
	  if(count%2 == 0){
		output += '</div><div class="row">'
	  }
	  count++;
    }
    console.log(items);
    // console.log(this.searchValueArray);
    });
    this.sws = items;
	  output += '</div>';
	  $('#filter-records').html(output);
  }
clicked (e, evn) {
  // const hasClass = evn.target.classList.contains('blank');
  // if(hasClass) {
  //   evn.target.removeClass(event.target, 'blank');
  //   evn.target.addClass(event.target, 'selected');
  // } else {
  //   evn.target.removeClass(event.target, 'selected');
  //   evn.target.addClass(event.target, 'blank');
  // }
  console.log( );
  if(evn.target.classList.contains('blank')) {
    evn.target.classList.remove('blank');
    evn.target.classList.add('selected');
    this.selection.push(e);
  }
  else if(evn.target.classList.contains('selected')) {
    evn.target.classList.remove('selected');
    evn.target.classList.add('blank');
    for(var i=0; i<this.selection.length; i++){
      if(this.selection[i].id===e.id) {
        this.selection.splice(i, 1); 
      }
    }
    // this.selection.pop(e);
  }
//  if(document.ge)
  // if(bgColor == 'lightgrey') {
  //   event.target.style.backgroundColor = 'red';
  // }
  // else {
  //   event.target.style.backgroundColor = 'lightgrey';
  // }
}
bookNow(data) {
  var total = 0;
  var tickets="";

  if(this.selection.length<2){
    alert("No seat selected");
  }
  else{
    for(var i=1; i<this.selection.length; i++) {
        total += this.selection[i].price;
        this.selection[i].status="occupied";
        tickets+=this.selection[i].name + ' ,';
        this.seatApi.replaceById(this.selection[i].id,this.selection[i]).subscribe(
          res => {
            console.log("res", this.products);
          },
          err => {
            console.log(err);
          }
        );
    }
    this.formService.sendEmail(data, tickets, total)
    .subscribe(res => {
      // gtag('event', 'conversion', {'send_to': 'AW-760961400/mnxmCNHM9qEBEPiy7eoC'});
      alert("Tickets Sucessfully booked, we will contact you soon for confirmation!");
      this.router.navigate(['']);
    }, error => {
    });
  }
}
  insertSeats() {
        var abc = [{}];
        for(var i=1; i<=46; i++) {
          abc[i-1] =   {
            "name": "W"+i,
            "status": "blank",
            "price": 300,
            "row": "W"
          }
        }

     for (var j in abc){
        this.seatApi.create(abc[j]).subscribe(res => {
          console.log("added category is" + res);
        });
     }
  }

  onClickSubmit(data) {
    console.log(data);
    data.dimension = [data.length, data.width];
    data.categoryId = this.selectedcat;
    data.createDate = new Date();
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
            ":"+this.port+"categories/" +
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
          ":"+this.port+"categories/" +
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
          ":"+this.port+"categories/" +
          data +
          "/proCat"
      )
      .subscribe(res => {
        console.log(res);
        this.products = res as any;
      });
  }

  addToCart(id, url, banner) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": id
      }
  };
  this.router.navigateByUrl('/cart', { state: { id: id } });
    //  this.router.navigate(['/cart'], navigationExtras);
  }
}
