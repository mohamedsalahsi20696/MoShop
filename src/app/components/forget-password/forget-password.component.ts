import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private _Fb: FormBuilder, private toastr: ToastrService) { }

  isLoading: boolean = false;
  isSendEmail: boolean = false;
  isSendCode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  emailForm = this._Fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  codeForm = this._Fb.group({
    resetCode: ['', [Validators.required]],
  });

  resetPasswordForm = this._Fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
  });

  forgotPassword(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.forgotPassword(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
      },
      error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
        this.isLoading = false
      },
      complete: () => {
        data.reset();
        this.isLoading = false;
        this.isSendEmail = true;
        this.toastr.success(this.successMessage, 'success');
      }
    });
  }

  resetCode(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.resetCode(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
      },
      error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
        this.isLoading = false;
      },
      complete: () => {
        data.reset();
        this.isLoading = false;
        this.isSendCode = true;
        this.toastr.success('success Code', 'success');
      }
    });
  }

  resetPassword(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.resetPassword(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
      },
      error: (myErrors) => {
        this.errorMessage = myErrors.error.message;
        this.isLoading = false;
      },
      complete: () => {
        data.reset();
        this.isLoading = false;
        this.toastr.success(this.successMessage, 'success');
        this._Router.navigate(['/login']);

      }
    });
  }

}
