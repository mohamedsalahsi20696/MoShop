import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'https://ecommerce.routemisr.com';
  userProfile = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.userData();
    }
  }

  userData() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    this.userProfile.next(decoded);     // to set value

  }

  register(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup`, data);
  }

  login(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin`, data);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userProfile.next(null);
    this._Router.navigate(['/login']);
  }

  forgotPassword(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords`, data);
  }

  resetCode(data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode`, data);
  }

  changeMyPassword(data: FormGroup): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/users/changeMyPassword`, data);
  }

  resetPassword(data: FormGroup): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword`, data);
  }

  updateMe(data: FormGroup): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/users/updateMe/`, data);
  }
}
