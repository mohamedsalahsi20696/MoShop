import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CashOrderComponent } from './components/cash-order/cash-order.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ChangeDataComponent } from './components/change-data/change-data.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent, title: 'Home' },

  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'Forget Password' },
  { path: 'changeData', canActivate: [AuthGuard], component: ChangeDataComponent, title: 'Change Data' },
  { path: 'changePassword', canActivate: [AuthGuard], component: ChangePasswordComponent, title: 'Change Password' },

  { path: 'category', canActivate: [AuthGuard], component: CategoriesComponent, title: 'Categories' },
  { path: 'categoryDetails/:id', canActivate: [AuthGuard], component: CategoryDetailsComponent, title: 'Category Details' },

  { path: 'brands', canActivate: [AuthGuard], component: BrandsComponent, title: 'Brands' },
  { path: 'brandDetails/:id', canActivate: [AuthGuard], component: BrandDetailsComponent, title: 'Brand Details' },

  { path: 'wishlist', canActivate: [AuthGuard], component: WishlistComponent, title: 'Wishlist' },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent, title: 'Cart' },
  { path: 'cashOrder/:id', canActivate: [AuthGuard], component: CashOrderComponent, title: 'Cash Payment' },
  { path: 'onlineOrder/:id', canActivate: [AuthGuard], component: CheckoutComponent, title: 'Online Payment' },
  { path: 'allorders', canActivate: [AuthGuard], component: AllordersComponent, title: 'All Orders' },


  { path: 'product', canActivate: [AuthGuard], component: ProductsComponent, title: 'Product' },
  { path: 'productDetails/:id', canActivate: [AuthGuard], component: ProductDetailsComponent, title: 'Product Details' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
