import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  myOrders: any;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.orderService.getOrdersByUserId().subscribe((res) => {
      console.log(res);
      this.myOrders = res;
    });
  }
}
