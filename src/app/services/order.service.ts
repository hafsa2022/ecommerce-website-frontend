import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: any;
  userData!: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/';
    this.userData = localStorage.getItem('user');
  }

  placeOrder(placeOrderDto: any): Observable<any> {
    placeOrderDto.userId = JSON.parse(this.userData).id;
    return this.http.post(this.baseUrl + 'user/placeorder', placeOrderDto);
  }

  getOrdersByUserId(): Observable<any> {
    let userId = JSON.parse(this.userData).id;
    return this.http.get(this.baseUrl + `user/orders/${userId}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.baseUrl + `admin/orders`);
  }
}
