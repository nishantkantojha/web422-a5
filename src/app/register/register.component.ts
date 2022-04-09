import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public user: RegisterUser = { userName: '', password: '', password2: '' };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  private registerSub: any;

  constructor(private authService: AuthService) {}

  onSubmit(f: NgForm): void {
    //console.log(this.user);

    if (
      this.user.userName != '' &&
      this.user.password != '' &&
      this.user.password2 != ''
    ) {
      this.registerSub = this.authService.register(this.user).subscribe(
        (success) => {
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
}
