import { HttpClient } from '@angular/common/http';
import { Category } from './../models/Category';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/admin/';
  }

  // createAuthorizationHeader(): HttpHeaders {
  //   let authHeaders: HttpHeaders = new HttpHeaders();
  //   return authHeaders.set(`Authorization`, `Beare ` + this.tokenService.get());
  // }

  addCategory(category: Category): Observable<any> {
    return this.http.post(this.baseUrl + 'addcategory', category);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + 'getcategories');
  }

  // deleteCategory(category: Category) {
  //   this.http.delete(this.baseUrl + `deletecategory/{category.id}`);
  // }
}
