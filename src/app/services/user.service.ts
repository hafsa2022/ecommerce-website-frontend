import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

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
    if (role != 'USER') {
      return false;
    }
    return true;
  }

  userLoggedIn() {
    return this.isValid();
  }
}
