import { Component, OnInit } from '@angular/core';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { UserService } from 'src/app/services/user/user.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { City } from 'src/app/shared/countries/interfaces/CitiesInterface';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { Region } from 'src/app/shared/countries/interfaces/RegionsInterface';
import { PostService } from 'src/app/services/post/post-service.service';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { Router } from '@angular/router';
import { CountryManagerService } from 'src/app/services/country/country-manager.service';
import { CountryManagerInterface } from 'src/app/services/country/interface/CountryManagerInterface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements CountryManagerInterface, OnInit {
  currentUser!: User
  availableMusicGenres: MusicGenre[] = [];
  selectedGenres: string[] = [];
  title = "";
  subtitle = "";
  body = "";
  image = "";
  errorMessage = "";

  // country manager
  countryData: string = "";
  regionData: string = "";

  countries: Country[] = [];
  regions: Region[] = [];
  cities: City[] = [];

  selectedCountry: string = "";
  selectedRegion: string = "";
  selectedCity: string = "";
  selectedCountryCode: string = "";

  citiesLoaded: boolean = false;
  regionsLoaded: boolean = false;
  // end country manager

  constructor(private userService: UserService, private musicGenres: MusicGenreService, private countryService: CountriesService, private postService: PostService, private countryManager: CountryManagerService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser()
    this.musicGenres.getAllMusicGenres().subscribe((genres: MusicGenre[]) => {
      this.availableMusicGenres = genres;
    });

    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  selectGenre($event: any) {
    if (this.selectedGenres.includes($event.target.value)) {
      let i = this.selectedGenres.indexOf($event.target.value);
      this.selectedGenres.splice(i, 1);
    } else {
      this.selectedGenres.push($event.target.value);
    }
  }

  onSelectCountry(): void {
    this.countryManager.selectCountry(this);
  }

  onSelectRegion(): void {
    this.countryManager.selectRegion(this);
  }

  createPost() {
    if (this.isValidForm()) {
      const post = {
        title: this.title,
        subtitle: this.subtitle,
        body: this.body,
        image: this.image,
        country: this.selectedCountry,
        region: this.selectedRegion,
        city: this.selectedCity,
        genres: this.selectedGenres
      }

      this.postService.createPost(post).subscribe((response: Post) => {
        this.router.navigate(['/post', response.id]);
      });
    }
  }

  private isValidForm() {
    let isFormValid = true;
    let mandatoryFields: any = {
      title: this.title,
      subtitle: this.subtitle,
      body: this.body,
      image: this.image,
      country: this.selectedCountry,
      selectedGenres: this.selectedGenres
    }

    for (let field of Object.getOwnPropertyNames(mandatoryFields)) {
      let element = document.getElementById(field);
      if (!mandatoryFields[field] || mandatoryFields[field].length === 0) {
        isFormValid = false;
        if (element) this.addInvalidClass(element);
      } else {
        if (element) this.removeInvalidClass(element);
      }
    }

    this.errorMessage = isFormValid ? "" : "Please fill all the fields";
    return isFormValid;
  }

  validateField(event: any) {
    if (event.target.value) {
      this.removeInvalidClass(event);
    } else {
      this.addInvalidClass(event);
    }
  }

  private removeInvalidClass(element: any) {
    element.classList.remove('is-invalid');
  }

  private addInvalidClass(element: any) {
    element.classList.add('is-invalid');
  }
}
