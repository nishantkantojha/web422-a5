import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';
import User from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public regUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;
  public user: User = { userName: '', password: '', _id: '' };

  private registerSub: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(f: NgForm): void {
    //console.log(this.user);

    if (
      this.regUser.userName != '' &&
      this.regUser.password != '' &&
      this.regUser.password2 != ''
    ) {
      this.registerSub = this.authService.register(this.regUser).subscribe(
        (success) => {
          this.user.userName = this.regUser.userName;
          this.user.password = this.regUser.password;

          //console.log(success);
          this.warning = '';
          this.success = true;
          this.loading = false;
        },
        (err) => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
  }

  autoLogin() {
    this.authService.login(this.user).subscribe(
      (success) => {
        // console.log(success);
        this.loading = false;
        this.authService.setToken(success.token);
        this.router.navigate(['/newReleases']);
      },
      (err) => {
        this.warning = err.error.message;
        this.loading = false;
      }
    );
  }
}
