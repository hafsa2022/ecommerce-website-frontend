import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  placeOrderForm!: FormGroup;
  payments = ['Cash on ddelivery', 'Online'];
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.placeOrderForm = this.fb.group({
      address: [null, Validators.required],
      orderDescription: [null, Validators.required],
      payment: [null, Validators.required],
    });
  }

  placeOrder() {
    console.log(this.placeOrderForm.value);
    this.orderService.placeOrder(this.placeOrderForm.value).subscribe((res) => {
      this.router.navigateByUrl('products');
    });
  }
}
