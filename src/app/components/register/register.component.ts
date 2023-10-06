import { AuthService } from './../../services/auth.service';
import { Component, ContentChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private _Fb: FormBuilder) { }

  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showRePassword: boolean = false;

  regForm = this._Fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
    rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]],
  }, { validators: this.matchPassword });

  registerUser(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.register(data.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this._Router.navigate(['/login']);
        }
      },
      error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        data.reset();
      }
    });
  }

  matchPassword(form: any) {
    let pass = form.get('password')
    let rePass = form.get('rePassword')

    if (pass.value === rePass.value) {
      return null;
    }
    else {
      return form.get('rePassword').setErrors({ matchRePassword: 'RePassword Not Matched' });
    }
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword;
  }

  changeShowRePassword() {
    this.showRePassword = !this.showRePassword;
  }


}

