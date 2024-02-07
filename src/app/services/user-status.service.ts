import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root',
})
export class UserStatusService {
  private userLoggedIn = new BehaviorSubject<boolean>(
    this.userService.userLoggedIn()
  );
  authStatus = this.userLoggedIn.asObservable();
  constructor(private userService: UserService) {}

  changeStatus(value: any) {
    this.userLoggedIn.next(value);
  }
}
