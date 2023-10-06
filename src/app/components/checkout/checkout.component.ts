import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  cartId: string = '';
  errorMessage: string = '';
  cartData: any;

  constructor(private _OrderService: OrderService, private _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService, private _CartService: CartService, private _Router: Router, private _Fb: FormBuilder) { }

  ngOnInit(): void {
    this.cartId = this._ActivatedRoute.snapshot.params['id'];
  }

  shippingAddress = this._Fb.group({
    details: ['', [Validators.required, Validators.minLength(10)]],
    phone: ['', [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(10)]],
  });

  onlineOrder(data: FormGroup) {
    this.errorMessage = '';

    this._OrderService.onlinePayment(this.cartId, data.value).subscribe({
      next: (res) => {
        this.cartData = res;

        window.open(this.cartData.session.url, '_blank');
        this._Router.navigate(['/product']);
        // window.location.href = this.cartData.session.url;
      }, error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
      },
      complete: () => {
        this._CartService.numOfCartItems.next(0);
        this.toastr.success(`${this.cartData.data.totalOrderPrice} ${this.cartData.data.paymentMethodType}`, this.cartData.status);
        this._Router.navigate(['/product']);
      }
    });
  }
}
