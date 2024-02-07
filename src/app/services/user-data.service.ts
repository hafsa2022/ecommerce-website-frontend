import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userData: any;
  constructor() {}
  handel(userData: any) {
    return this.set(userData);
  }

  // handelRole(role: any) {
  //   return this.setRole(role);
  // }

  set(userData: any) {
    return localStorage.setItem('user', JSON.stringify(userData));
  }

  // setRole(role: any) {
  //   return localStorage.setItem('role', JSON.stringify(role));
  // }

  get() {
    this.userData = localStorage.getItem('user');
    return JSON.parse(this.userData);
  }

  // getRole() {
  //   return localStorage.getItem('role');
  // }

  remove() {
    return localStorage.removeItem('user');
  }
  // removeRole() {
  //   return localStorage.removeItem('role');
  // }
}
