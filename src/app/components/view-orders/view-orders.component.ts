import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  orders: any;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      console.log(res);
      this.orders = res;
    });
  }
}
