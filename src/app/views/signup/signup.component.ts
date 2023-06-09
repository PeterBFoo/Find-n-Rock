import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { UserService } from 'src/app/services/user/user.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  entrepreneur: boolean = false;
  musicGroup: boolean = true;

  username: string = "";
  password: string = "";
  description: string = "";
  name: string = "";
  email: string = "";
  address: string = "";
  phoneNumber: string = "";
  country!: string;
  integrants!: number;
  image: string = "";
  musicGenres: string[] = [];
  dataloaded: boolean = false;

  availableCountries: Country[] = [];
  availableMusicGenres: MusicGenre[] = [];
  errorMessage: string = "";

  constructor(private musicGenreService: MusicGenreService, private countryService: CountriesService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.musicGenreService.getAllMusicGenres().subscribe((musicGenres: MusicGenre[]) => {
      this.availableMusicGenres = musicGenres;
      this.countryService.getAllCountries().subscribe((countries: Country[]) => {
        this.availableCountries = countries;
        this.dataloaded = true;
      });
    });
  }

  register() {
    if (this.validateFields()) {
      if (this.entrepreneur) {
        this.registerEntrepreneur();
      } else {
        this.registerMusicGroup();
      }
    }
  }

  selectRole(event: any) {
    if (event.target.value == "Entrepreneur") {
      this.entrepreneur = true;
      this.musicGroup = false;
    } else {
      this.entrepreneur = false;
      this.musicGroup = true;
    }
  }

  validateFields() {
    let mandatoryFields = this.getMandatoryFields();

    let component: any = this;
    let isValid = true;

    mandatoryFields.forEach((field: string) => {
      if (component[field] == "" || !component[field]) {
        isValid = false;
        this.errorMessage = "Please fill all the fields";
        this.addErrorClass(field);
      } else {
        this.removeErrorClass(field);
      }
    });

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = "Please enter a valid email";
      isValid = false;
    }

    if (isNaN(this.integrants) && this.musicGroup) {
      this.errorMessage = "Integrants must be a number"
      isValid = false
    }

    return isValid;
  }

  private getMandatoryFields(): string[] {
    let mandatoryFields = ["username", "password", "name", "email", "address", "phoneNumber", "country", "image", "description"];
    let mandatoryFieldsGroup = ["integrants", "musicGenres"];

    if (this.musicGroup) {
      mandatoryFields = mandatoryFields.concat(mandatoryFieldsGroup);
    }

    return mandatoryFields;
  }

  resetForm() {
    let form = document.getElementById("signupForm") as HTMLFormElement;
    form.reset();
    this.clearGenres();
    this.getMandatoryFields().forEach((field) => {
      this.removeErrorClass(field);
    })
    this.errorMessage = "";
  }

  clearGenres() {
    this.musicGenres = [];
  }

  private addErrorClass(field: string) {
    let element: any = document.getElementById(field);
    element.classList.add("is-invalid");
  }

  private removeErrorClass(field: string) {
    let element: any = document.getElementById(field);
    element.classList.remove("is-invalid");
  }

  private registerEntrepreneur() {
    let entrepreneur = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phoneNumber,
      country: this.country,
      image: this.image,
      description: this.description,
      role: "entrepreneur"
    }
    this.userService.signupEntrepreneur(entrepreneur).pipe(
      catchError((error: any) => {
        this.errorMessage = error.error;
        throw error;
      }))
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
      });
  }

  private registerMusicGroup() {
    let musicGroup = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phoneNumber,
      country: this.country,
      image: this.image,
      description: this.description,
      integrants: this.integrants,
      musicalGenres: this.musicGenres,
      role: "group"
    }

    this.userService.signupMusicGroup(musicGroup).pipe(
      catchError((error: any) => {
        this.errorMessage = error.error;
        throw error;
      }))
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
      });
  }
}
