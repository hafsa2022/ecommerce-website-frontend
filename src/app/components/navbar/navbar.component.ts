import { UserStatusService } from './../../services/user-status.service';
import { AdminStatusService } from './../../services/admin-status.service';
import { UserDataService } from './../../services/user-data.service';
import { AuthStatusService } from './../../services/auth-status.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuActive = false;
  loggedIn: boolean = false;
  adminLoggedIn: boolean = false;
  userLoggedIn: boolean = false;

  constructor(
    private authStatusService: AuthStatusService,
    private adminStatusService: AdminStatusService,
    private userStatusService: UserStatusService,
    private router: Router,
    private tokenService: TokenService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.authStatusService.authStatus.subscribe(
      (value) => (this.loggedIn = value)
    );

    this.adminStatusService.authStatus.subscribe(
      (value) => (this.adminLoggedIn = value)
    );

    this.userStatusService.authStatus.subscribe(
      (value) => (this.userLoggedIn = value)
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authStatusService.changeStatus(false);
    this.adminStatusService.changeStatus(false);
    this.userStatusService.changeStatus(false);
    this.tokenService.remove();
    this.userDataService.remove();
    this.router.navigateByUrl('login');
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  toHome() {
    this.router.navigateByUrl('');
  }
}
