import { Component } from '@angular/core';
import { User } from 'src/app/services/interfaces/UserInterface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = this.userService.getUser();

  changedInfoState = false;
  changedPasswordState = false;

  passwordErrorMessage = "";
  infoErrorMessage = "";

  username: string = this.user.username;
  password: string = "";
  email: string = this.user.email;
  name: string = this.user.name;
  phone: string = this.user.phone;
  address: string = this.user.address;
  country: string = this.user.country;
  image: string = this.user.image;
  integrants: number = this.user.integrants || 0;
  description: string = this.user.description;
  doublePassword: string = "";

  constructor(private userService: UserService) {
    console.log(this.user);
  }

  onEdit() {
    let fields = this.getModifiedFields() as any;
    let changes = {} as any;

    if (fields.length > 0) {
      for (let field of fields) {
        let __this = this as any
        changes[field] = __this[field];
      }
    }

    this.userService.updateUser(changes).subscribe(
      (response) => {
        console.log(response);
        this.userService.setUser(response);
        this.changedInfoState = true;

        setInterval(() => {
          this.changedInfoState = false;
        }, 5000);
      });
  }

  onChangePassword() {
    if (this.isValidPassword(this.password)) {
      this.userService.updateUser({
        password: this.password
      }).subscribe(
        (response) => {
          this.userService.setUser(response);
          this.changedPasswordState = true;

          setInterval(() => {
            this.changedPasswordState = false;
          }, 5000);
        });
    }
  }

  isValidPassword(password: string) {
    let isValid = true;

    if (password.length < 8) {
      this.passwordErrorMessage = "Password must be at least 8 characters long";
      isValid = false;
    }
    else if (password != this.doublePassword) {
      this.passwordErrorMessage = "Passwords don't match";
      isValid = false;
    }

    return isValid;
  }

  isValidEmail() {
    let isValid = true;

    if (!this.email.includes("@")) {
      this.infoErrorMessage = "Email must contain '@'";
      isValid = false;
    }
    else if (!this.email.includes(".")) {
      this.infoErrorMessage = "Email must contain '.'";
      isValid = false;
    }

    return isValid;
  }


  private getModifiedFields() {
    let fields = [];

    if (this.username != this.user.username) {
      fields.push("username");
    }
    if (this.password != this.user.password) {
      fields.push("password");
    }
    if (this.email != this.user.email) {
      fields.push("email");
    }
    if (this.name != this.user.name) {
      fields.push("name");
    }
    if (this.phone != this.user.phone) {
      fields.push("phone");
    }
    if (this.address != this.user.address) {
      fields.push("address");
    }
    if (this.country != this.user.country) {
      fields.push("country");
    }
    if (this.image != this.user.image) {
      fields.push("image");
    }
    if (this.integrants != this.user.integrants) {
      fields.push("integrants");
    }
    if (this.description != this.user.description) {
      fields.push("description");
    }

    return fields;
  }
}
