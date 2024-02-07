import { UserStatusService } from './../../services/user-status.service';
import { AdminStatusService } from './../../services/admin-status.service';
// import { ToastrService } from 'ngx-toastr';
import { UserDataService } from './../../services/user-data.service';
import { AuthStatusService } from './../../services/auth-status.service';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { SignInUser } from './../../models/SignInUser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: SignInUser;
  error: any = '';
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private authStatusService: AuthStatusService,
    private adminStatusService: AdminStatusService,
    private userStatusService: UserStatusService,
    private userDataService: UserDataService
  ) {
    this.user = new SignInUser();
  }

  signIn() {
    this.authService.login(this.user).subscribe(
      (data) => {
        this.handelResponse(data);
        // this.toastr.success('Welcome to our app', '', {
        //   timeOut: 2000,
        //   progressBar: true,
        // });
      },
      (error) => this.handelError(error)
    );
  }

  handelResponse(data: any) {
    this.tokenService.handel(data.token);
    this.userDataService.handel(data.user);
    this.authStatusService.changeStatus(true);
    if (data.user?.role == 'ADMIN') {
      this.adminStatusService.changeStatus(true);
    } else if (data.user?.role == 'USER')
      this.userStatusService.changeStatus(true);
    this.router.navigateByUrl('dashboard');
  }

  handelError(error: any) {
    this.error = error.error;
  }

  toSignUp() {
    this.router.navigateByUrl('signup');
  }
}
