import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseURL: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) { }

  addWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`, { productId: id });
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`);
  }

  deleteWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${id}`);
  }
}
