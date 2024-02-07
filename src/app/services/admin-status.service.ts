import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AdminStatusService {
  private adminLoggedIn = new BehaviorSubject<boolean>(
    this.adminService.adminLoggedIn()
  );
  authStatus = this.adminLoggedIn.asObservable();
  constructor(private adminService: AdminService) {}

  changeStatus(value: any) {
    this.adminLoggedIn.next(value);
  }
}
