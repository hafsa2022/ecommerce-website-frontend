import { SignInUser } from './../models/SignInUser';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/auth/';
  }

  signup(data: User) {
    return this.http.post(this.baseUrl + 'signup', data);
  }

  login(data: SignInUser) {
    return this.http.post(this.baseUrl + 'signin', data);
  }
}
