import { product } from './../../interfaces/user-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productId: string = '';
  productDetails: product | undefined;
  // productDetails: product[] = [];

  cartData: any;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1500,
    mouseDrag: true,
    touchDrag: false,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left text-black"></i>', '<i class="fa-solid fa-chevron-right text-black"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.productId = this._ActivatedRoute.snapshot.params['id'];

    this._ProductService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (myError) => { },
      complete: () => { }
    })

  }

  addToCart(id?: string) {
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
