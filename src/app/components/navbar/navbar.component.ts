import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLogin: boolean = false;
  numOfCartItems: number = 5;
  errorMessage: string = '';

  constructor(private _AuthService: AuthService, private _CartService: CartService) { }

  ngOnInit(): void {

    this._AuthService.userProfile.subscribe({
      next: () => {
        if (this._AuthService.userProfile.getValue() !== null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })

    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      }, error: (myError) => {
        this.errorMessage = myError.message;
      }
    })

    this._CartService.numOfCartItems.subscribe(() => {
      this.numOfCartItems = this._CartService.numOfCartItems.getValue();
    })
  }

  logout() {
    this._AuthService.logout();
  }
}
