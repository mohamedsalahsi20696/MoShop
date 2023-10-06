import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) { }

  getAllCategories(numberOfPages: number): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories?page=${numberOfPages}`);
  }

  getCategoryById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories/${id}`);
  }
}
