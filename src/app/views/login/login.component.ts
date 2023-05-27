import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  invalidInput = false;

  constructor(private userService: UserService, private router: Router) { }

  async onLogin() {
    if (this.validateInput(this.username, this.password)) {
      this.userService.login(this.username, this.password).pipe(
        catchError((res) => {
          this.errorMessage = res.error;
          return of(res);
        })).subscribe((res) => {
          if (res.token) {
            this.userService.setToken(res.token);
            this.userService.setUser(res.user);
            this.router.navigate(["/home"]);
          }
        });
    }
  }

  private validateInput(username: string, password: string) {
    if (username == "") {
      this.invalidInput = true;
      this.errorMessage = "Username is required";
      return false;
    }

    if (password == "") {
      this.invalidInput = true;
      this.errorMessage = "Password is required";
      return false;
    }

    this.invalidInput = true;
    return true;
  }
}
