import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public user: User = { userName: '', password: '', _id: '' };
  warning: string = '';
  loading: boolean = false;

  //private registerSub: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(f: NgForm): void {
    //console.log(this.user);

    if (this.user.userName != '' && this.user.password != '') {
      this.loading = true;
      //this.registerSub = 
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
}
