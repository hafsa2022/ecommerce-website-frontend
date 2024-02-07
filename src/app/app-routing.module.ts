import { AddProductComponent } from './components/add-product/add-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { CartComponent } from './components/cart/cart.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AfterLoginService } from './services/after-login.service';
import { MyordersComponent } from './components/myorders/myorders.component';
import { LoginComponent } from './components/login/login.component';
import { BeforeLoginService } from './services/before-login.service';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'my-orders',
    component: MyordersComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'my-profile',
    component: MyprofileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AfterLoginService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
