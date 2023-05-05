import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.scss']
})
export class ChangeDataComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _Fb: FormBuilder, private toastr: ToastrService) { }

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  updateMeForm = this._Fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]],
  });


  updateMe(data: FormGroup) {

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.updateMe(data.value).subscribe({
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
      }
    });
  }

}
