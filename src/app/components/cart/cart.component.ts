import { Component, OnInit } from '@angular/core';
import { cartData } from 'src/app/interfaces/user-data';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: any;

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {

    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
        console.log(res);

      },
      error: (error) => { },
      complete: () => { }
    })
  }

  plusCount(id: string, count: number) {
    this._CartService.updateCountCartItem(id, count + 1).subscribe({
      next: (res) => {
        this.cartData = res.data;
      }, complete: () => {
        this.getUserCart();
      }
    })
  }

  minusCount(id: string, count: number) {
    if (count > 1) {
      this._CartService.updateCountCartItem(id, count - 1).subscribe({
        next: (res) => {
          this.cartData = res.data;
        }, complete: () => {
          this.getUserCart();
        }
      })
    }
    else {
      this.deleteCartItem(id);
    }
  }

  deleteCartItem(id: string) {
    this._CartService.deleteCartItem(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this._CartService.numOfCartItems.next(res.numOfCartItems);

      }, complete: () => {
        this.getUserCart();
      }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this._CartService.numOfCartItems.next(res.numOfCartItems);

      }, complete: () => {
        this._CartService.numOfCartItems.next(0);
        this.getUserCart();
      }
    })
  }






}
