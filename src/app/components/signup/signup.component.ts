import { Router } from '@angular/router';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  error: any = [];
  user: User;
  getResponse: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  handelError(error: any) {
    this.error = error.error;
  }

  signUp() {
    this.authService.signup(this.user).subscribe(
      (res) => {
        console.log('res', res);

        // this.toastr.success(
        //   'Your account created succesfully, please go to Sign In.',
        //   '',
        //   {
        //     progressBar: true,
        //     timeOut: 3000,
        //   }
        // );
        this.router.navigateByUrl('login');
        this.error = [];
      },
      (err) => this.handelError(err)
    );
  }

  toSignIn() {
    this.router.navigateByUrl('login');
  }
}
