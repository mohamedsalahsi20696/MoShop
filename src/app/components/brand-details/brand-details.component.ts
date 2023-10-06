import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { product } from 'src/app/interfaces/user-data';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent {

  products: product[] = [];
  brandId: string = '';
  cartData: any;
  errorMessage: string = '';
  founded: Boolean = false;
  allWishList: product[] = [];

  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService, private _WishlistService: WishlistService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.brandId = this._ActivatedRoute.snapshot.params['id'];

    this.getProduct();
  }

  getProduct() {
    this._ProductService.getAllProductsOfBrand(this.brandId).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (myError) => {

      },
      complete: () => {
        this._WishlistService.getWishList().subscribe({
          next: (res_wishlist) => {
            this.allWishList = res_wishlist.data;
            for (let i = 0; i < this.allWishList.length; i++) {
              for (let j = 0; j < this.products.length; j++) {
                if (this.allWishList[i]._id === this.products[j]._id) {
                  document.querySelectorAll('#wishlist-icon')[j].classList.add('fa-solid');
                }
              }
            }
          }
        })
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

  checkToWishList(id: string, index: number) {
    this.founded = false;

    this._WishlistService.getWishList().subscribe({
      next: (res_wishlist) => {
        this.allWishList = res_wishlist.data;

        for (let i = 0; i < this.allWishList.length; i++) {
          if (this.allWishList[i]._id === id) {
            this.founded = true;
          }
        }

        if (!this.founded) {
          this.addWishlist(id, index);
        }
        else {
          this.deleteWishlist(id, index);
        }
      }
    })
  }

  addWishlist(id: string, index: number) {
    this._WishlistService.addWishList(id).subscribe({
      next: (res) => {
        document.querySelectorAll('#wishlist-icon')[index].classList.remove('fa-regular');
        document.querySelectorAll('#wishlist-icon')[index].classList.add('fa-solid');
      },
      error: (myError) => { },
      complete: () => { }
    })
  }

  deleteWishlist(id: string, index: number) {
    this._WishlistService.deleteWishList(id).subscribe({
      next: (res) => {
        document.querySelectorAll('#wishlist-icon')[index].classList.remove('fa-solid');
        document.querySelectorAll('#wishlist-icon')[index].classList.add('fa-regular');
      },
      error: (myError) => { },
      complete: () => { }
    })
  }
}
