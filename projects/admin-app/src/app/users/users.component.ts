import { Component, OnInit } from '@angular/core';
import { LoopBackConfig } from '../../app/shared/sdk/lb.config';
import { ProductApi } from "../../app/shared/sdk/services/custom/Product";
import { CartApi } from "../../app/shared/sdk/services/custom/Cart";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private router: Router,
    public prodApi: ProductApi,
    public cartApi: CartApi,
    private http: HttpClient
  ) {
    LoopBackConfig.setBaseURL("http://127.0.0.1:8086");
   }
   port = "8086/api/";
   products = [{}];
   cartProducts: any;
   cartItems = [{}]
   ngOnInit() {
     this.prodApi.find().subscribe(
       res => {
         this.products = res;
       },
       err => {
         console.log(err);
       }
     );
     this.cartApi.find().subscribe(
      res => {
        this.cartItems = res;
        console.log(this.cartItems);
      },
      err => {
        console.log(err);
      }
    );
     this.cartApi.count({uid: 104}).subscribe(
      res => {
        this.cartProducts=res.count;
      },
      err => {
        console.log(err);
      }
     );
   }

   addToCart (p) {
     console.log(p);
     for(var i=0;i<this.cartItems.length;i++)  {
       if (this.cartItems[i].products[0].id == p.id) {
          console.log("Item Already exists");
       }
       else {
         console.log("New Product Added");
       }
     }
     var r={uid:"",products:[],orderDate:new Date, totalAmount:0, status:""};
     r.uid = "104";
     r.products.push(p);
     r.orderDate = new Date();
     r.totalAmount = p.price ; 
     r.status = "Order Received";
     this.cartApi.create(r).subscribe(
      res => {
        console.log("res", res);
      },
      err => {
        console.log(err);
      }
     );

     this.cartApi.count({uid: 104}).subscribe(
      res => {
        this.cartProducts=res.count;
      },
      err => {
        console.log(err);
      }
     )

   }

}
