import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  handel(token: any) {
    this.set(token);
  }

  set(token: any) {
    return localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token == null) {
      // const payload = this.payload(token);
      // console.log('payload', payload);
      // if (payload) {
      // console.log('payload.iss', payload.iss);
      // return payload.iss === 'http://localhost:8080/api/v1/auth/signin'
      // ? true
      // : false;
      return false;
    }
    return true;
  }

  // payload(token: any) {
  //   console.log('token', JSON.parse(atob(token.split('.')[1])));
  //   return JSON.parse(atob(token.split('.')[1]));
  // }

  loggedIn() {
    return this.isValid();
  }
}
