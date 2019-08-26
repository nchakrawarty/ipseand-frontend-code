import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user/user.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  { path: "", component: UserComponent },
  { path: "products", component: ProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "category", component: CategoryComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
