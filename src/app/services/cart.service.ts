import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL: string = 'https://ecommerce.routemisr.com';
  numOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) { }

  addToCart(id?: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`, { productId: id })
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`)
  }

  updateCountCartItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${id}`, { count: count })
  }

  deleteCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${id}`)
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`)
  }

}
