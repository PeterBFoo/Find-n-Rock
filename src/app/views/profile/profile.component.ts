import { Component } from '@angular/core';
import { User } from 'src/app/services/interfaces/UserInterface';
import { UserService } from 'src/app/services/user/user.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = this.userService.getUser();

  changedInfoState = false;
  changedPasswordState = false;
  passwordDisabled = false;

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
  integrants: number | null = this.user.integrants;
  description: string = this.user.description;
  doublePassword: string = "";

  availableCountries: Country[] = []

  constructor(private userService: UserService, private countryService: CountriesService) {
    this.countryService.getAllCountries().subscribe(
      (response) => {
        this.availableCountries = response.data;
      });
  }

  onEdit() {
    let fields = this.getModifiedFields() as string[];
    let changes = this.getChanges();

    if (this.areValidFields(changes) && fields.length > 0) {
      this.userService.updateUser(changes).subscribe(
        (response) => {
          if (fields.includes("image")) window.location.reload();

          this.userService.setUser(response);
          this.changedInfoState = true;

          setInterval(() => {
            this.changedInfoState = false;
          }, 5000);
        });
    } else {
      this.infoErrorMessage = "No changes were made";
    }
  }

  private getChanges(_fields?: any) {
    let fields = _fields || this.getModifiedFields();
    let changes = {} as any;

    if (fields.length > 0) {
      for (let field of fields) {
        let __this = this as any
        changes[field] = __this[field];
      }
    }

    return changes;
  }

  shouldBeDisabled() {
    return this.getModifiedFields().length <= 0
      || !this.areValidFields(this.getChanges())
      || !this.isValidEmail()
      || !this.isValidImage();
  }

  private areValidFields(data: any) {
    let isValid = true;
    Object.getOwnPropertyNames(data).forEach(field => {
      if (data[field] == "" || data[field] == null || data[field] == undefined) {
        isValid = false;
      }
    });

    return isValid;
  }

  onChangePassword() {
    if (this.isValidPassword(this.password)) {
      this.passwordDisabled = true;
      this.userService.updateUser({
        password: this.password
      }).subscribe(
        (response) => {
          this.userService.setUser(response);
          this.changedPasswordState = true;

          setInterval(() => {
            this.changedPasswordState = false;
            this.passwordDisabled = false;
          }, 5000);
        });
    }
  }

  private isValidPassword(password: string) {
    let isValid = true;

    if (password.length < 8) {
      this.passwordErrorMessage = "Password must be at least 8 characters long";
      this.changedPasswordState = false;
      isValid = false;
    }
    else if (password != this.doublePassword) {
      this.passwordErrorMessage = "Passwords don't match";
      this.changedPasswordState = false;
      isValid = false;
    }

    if (isValid) this.resetPasswordErrorMessage();

    return isValid;
  }

  private resetPasswordErrorMessage() {
    this.passwordErrorMessage = "";
  }

  private resetErrorMessage() {
    this.infoErrorMessage = "";
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

    if (isValid) this.resetErrorMessage();
    return isValid;
  }

  isValidImage() {
    let isValid = true;

    if (!this.image.includes("http") || !this.image.includes("https") || !this.image.includes(".") || !this.image.includes("/") || !this.image.includes(":")) {
      this.infoErrorMessage = "Image must be a valid URL";
      isValid = false;
    }

    if (isValid) this.resetErrorMessage();
    return isValid;
  }


  getModifiedFields() {
    let modifiedFields = [];
    let modifiableFields = ["username", "email", "name", "phone", "address", "country", "image", "integrants", "description"];

    let __this = this as any;
    for (let field of modifiableFields) {
      if (__this[field] != __this.user[field]) {
        modifiedFields.push(field);
      }
    }

    return modifiedFields;
  }
}
