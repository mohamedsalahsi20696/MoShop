import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/user-data';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products: product[] = [];
  cartData: any;

  constructor(private _CartService: CartService, private _WishlistService: WishlistService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWishList();
  }

  getWishList() {

    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (MyError) => { },
      complete: () => { }
    })
  }

  deleteWishList(id: string) {
    this._WishlistService.deleteWishList(id).subscribe({
      next: (res) => {
        this.products = res.data;
        this.cartData = res;

      },
      error: () => { },
      complete: () => {
        this.toastr.success(this.cartData.message, this.cartData.status);
        this.getWishList();
      }
    })
  }

  addToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.cartData = res;
        this._CartService.numOfCartItems.next(this.cartData.numOfCartItems);
      },
      complete: () => {
        this.toastr.success(this.cartData.message, this.cartData.status);
      }
    })
  }
}
