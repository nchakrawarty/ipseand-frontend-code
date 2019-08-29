import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public id: any;
  data: any
  constructor( private location: Location, private router: Router, private http:Http, private route: ActivatedRoute ) {
    //   this.route.queryParams.subscribe(params => {
    //     this.id = params["id"];
    // });
    const navigation = this.router.getCurrentNavigation();
    this.id = navigation.extras.state ? navigation.extras.state.id : 0;
  }

  ngOnInit() {
    this.http
    .get(
      "http://127.0.0.1:8086/api/products/"+this.id
    )
    .subscribe(res => {
      // console.log("Cart value :" +res);
      this.data = res.json();
    });
  }

}
