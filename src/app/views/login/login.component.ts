import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private userService: UserService, private router: Router) { }

  async onLogin() {
    this.validateInput(this.username, this.password);
    if (this.errorMessage != "") return;

    this.userService.login(this.username, this.password).subscribe((res) => {
      if (res.token) {
        this.userService.setToken(res.token);
        this.userService.setUser(res.user);
        this.router.navigate(["/home"]);
      } else {
        this.errorMessage = res.error;
      }
    });
  }

  validateInput(username: string, password: string) {
    this.errorMessage = username == "" || password == "" ? "Please fill in all fields" : "";
  }
}
