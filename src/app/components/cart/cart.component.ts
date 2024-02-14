import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  totalAmount: number = 0;
  cartProducts: any = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getCartByUserId();
  }

  getCartByUserId() {
    this.cartService.getCartByUserId().subscribe((res) => {
      console.log(res);

      this.cartProducts = res.cartItemRequestList;
      this.totalAmount = res.amount;
    });
  }
  minusProduct(productId: number) {
    this.cartService.decreaseProductOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.getCartByUserId();
    });
  }

  addProduct(productId: number) {
    this.cartService.increaseProductOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.getCartByUserId();
    });
  }

  toPlaceOrder() {
    this.router.navigateByUrl('palce-order');
  }
}
