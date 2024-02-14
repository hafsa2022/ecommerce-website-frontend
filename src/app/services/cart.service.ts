import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: any;
  userData!: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/user/';
    this.userData = localStorage.getItem('user');
  }

  addProductToCart(productId: number) {
    let CartItemDTO = {
      productId: productId,
      userId: JSON.parse(this.userData).id,
    };
    return this.http.post(this.baseUrl + 'addproducttocart', CartItemDTO);
  }

  getCartByUserId(): Observable<any> {
    let userId = JSON.parse(this.userData).id;
    return this.http.get(this.baseUrl + `cart/${userId}`);
  }

  decreaseProductOfProduct(productId: number): Observable<any> {
    let userId = JSON.parse(this.userData).id;
    return this.http.get(this.baseUrl + `${userId}/deduct/${productId}`);
  }

  increaseProductOfProduct(productId: number): Observable<any> {
    let userId = JSON.parse(this.userData).id;
    return this.http.get(this.baseUrl + `${userId}/add/${productId}`);
  }
}
