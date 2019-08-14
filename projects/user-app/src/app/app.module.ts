import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SDKBrowserModule } from "../app/shared/sdk/index";
import { ProductsComponent } from "./products/products.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserComponent } from "./user/user.component";

@NgModule({
  declarations: [AppComponent, ProductsComponent, UserComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    AngularMultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
