import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private _Fb: FormBuilder, private toastr: ToastrService) { }

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  changePasswordForm = this._Fb.group({
    currentPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
    rePassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]],
  }, { validators: this.matchPassword });


  changePassword(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.changeMyPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);

        this.successMessage = res.message;
      },
      error: (myErrors) => {
        console.log(myErrors);

        this.errorMessage = myErrors.error.errors.msg;
        this.isLoading = false;
      },
      complete: () => {
        data.reset();
        this.isLoading = false;
        this.toastr.success('Changed success', 'success');
        this._AuthService.logout();
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
}
