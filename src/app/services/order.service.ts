import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) { }


  CashPayment(cartId: string, data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/${cartId}`, { shippingAddress: data })
  }

  getUserOrders(cartId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${cartId}`)
  }

  onlinePayment(cartId: string, data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/`, { shippingAddress: data })
  }
}
