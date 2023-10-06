import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(numberOfPages: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?page=${numberOfPages}`);
  }

  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${id}`);
  }

  getAllProductsOfCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?category=${categoryId}`);
  }

  getAllProductsOfBrand(brandId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?brand=${brandId}`);
  }
}
