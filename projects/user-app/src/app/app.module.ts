import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SDKBrowserModule } from "../app/shared/sdk/index";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, SDKBrowserModule.forRoot(), FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
