import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router,
    private _Fb: FormBuilder, private _CartService: CartService) { }

  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  loginForm = this._Fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
  });

  loginUser(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.setItem('userToken', res.token);
          this._Router.navigate(['/home']);
          this._AuthService.userData();
        }
      },
      error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false;
        this._CartService.getUserCart().subscribe({
          next: (res) => {
            this._CartService.numOfCartItems.next(res.numOfCartItems);
          }
        })
      }
    });
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
