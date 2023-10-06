import { WishlistService } from './../../services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { product } from 'src/app/interfaces/user-data';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: product[] = [];
  cartData: any;
  errorMessage: string = '';
  page: number = 1;
  limit: number = 0;
  count: number = 0;
  founded: Boolean = false;
  allWishList: product[] = [];

  constructor(private _ProductService: ProductService, private _CartService: CartService,
    private _WishlistService: WishlistService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getProducts(1);
  }

  getProducts(numberOfPages: number) {
    this._ProductService.getAllProducts(numberOfPages).subscribe({
      next: (res) => {
        this.page = res.metadata.currentPage;
        this.limit = res.metadata.limit;
        this.count = res.results;
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getProducts(this.page);
  }

  onTableSizeChange(event: any): void {
    this.limit = event;
    this.page = 1;
    this.getProducts(this.page);
  }
}
