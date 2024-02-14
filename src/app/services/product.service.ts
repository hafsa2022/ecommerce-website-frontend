import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/admin/';
  }

  // createAuthorizationHeader(): HttpHeaders {
  //   let authHeaders: HttpHeaders = new HttpHeaders();
  //   return authHeaders.set(`Authorization`, `Beare ` + this.tokenService.get());
  // }

  addProduct(categoryId: number, formData: FormData): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.baseUrl + `addproduct/${categoryId}`, formData);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + 'getproducts');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<[]>(this.baseUrl + `product/${id}`);
  }

  updateProduct(
    categoryId: number,
    productId: number,
    product: any
  ): Observable<any> {
    return this.http.put<[]>(
      this.baseUrl + `${categoryId}/updateproduct/${productId}`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + `deleteproduct/${id}`);
  }

}
