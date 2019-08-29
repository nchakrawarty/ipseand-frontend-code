import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { SDKBrowserModule } from "../app/shared/sdk/index";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';

import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SDKBrowserModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
