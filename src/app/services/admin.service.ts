import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  user: any;

  constructor() {
    this.user = localStorage.getItem('user');

  }

  get() {
    this.user = JSON.parse(this.user);
    return this.user;
  }

  isValid() {
    const role = this.get()?.role;
    if (role != 'ADMIN') {
      return false;
    }
    return true;
  }

  adminLoggedIn() {
    return this.isValid();
  }

}
