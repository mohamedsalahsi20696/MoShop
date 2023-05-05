import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {

  userId: any;
  order: any;

  constructor(private _OrderService: OrderService, private _AuthService: AuthService) { }

  ngOnInit(): void {

    this.userId = this._AuthService.userProfile.getValue();

    console.log(this.userId);

    this._OrderService.getUserOrders(this.userId.id).subscribe({
      next: (res) => {
        this.order = res;
        console.log(this.order);
      },
      error: () => { },
      complete: () => { }
    })
  }
}
