import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { UserService } from 'src/app/services/user/user.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { CountriesData } from 'src/app/shared/countries/interfaces/CountriesInterface';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  entrepreneur: boolean = false;
  musicGroup: boolean = true;

  username: string = "";
  password: string = "";
  description: string = "";
  name: string = "";
  email: string = "";
  address: string = "";
  phoneNumber: string = "";
  country: string = "";
  integrants: number = 0;
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
    });

    this.countryService.getAllCountries().subscribe((countriesData: CountriesData) => {
      this.availableCountries = countriesData.data;
      this.dataloaded = true;
    });
  }

  register() {
    try {
      this.validateFields();

      if (this.entrepreneur) {
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
      } else {
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
    } catch (error) {
    }

  }

  selectGenre($event: any) {
    if (this.musicGenres.includes($event.target.value)) {
      let i = this.musicGenres.indexOf($event.target.value);
      this.musicGenres.splice(i, 1);
      // remove atribute "selected"
      $event.target.checked = false;
    } else {
      this.musicGenres.push($event.target.value);
      $event.target.checked = true;
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

  onSelectCountry(event: any) {
    this.country = event.target.value;
  }

  validateFields() {
    let mandatoryFields = ["username", "password", "name", "email", "address", "phoneNumber", "country", "image", "description"];
    let mandatoryFieldsGroup = ["integrants", "musicGenres"];

    if (this.musicGroup) {
      mandatoryFields = mandatoryFields.concat(mandatoryFieldsGroup);
    }

    mandatoryFields.forEach((field: string) => {
      let component: any = this;
      if (component[field] == "") {
        this.errorMessage = "Please fill all the fields, " + field + " is missing";
        throw this.errorMessage;
      }
    });

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = "Please enter a valid email";
      throw this.errorMessage;
    }

    let imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

    if (!imageRegex.test(this.image)) {
      this.errorMessage = "Please enter a valid image url";
      throw this.errorMessage;
    }
  }
}
