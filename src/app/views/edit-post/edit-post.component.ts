import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CountryManagerService } from 'src/app/services/country/country-manager.service';
import { CountryManagerInterface } from 'src/app/services/country/interface/CountryManagerInterface';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { Post } from 'src/app/services/interfaces/PostInterface';
import { User } from 'src/app/services/interfaces/UserInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { PostService } from 'src/app/services/post/post-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { City } from 'src/app/shared/countries/interfaces/CitiesInterface';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { Region } from 'src/app/shared/countries/interfaces/RegionsInterface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements CountryManagerInterface {
  post!: Post;
  currentUser!: User
  availableMusicGenres: MusicGenre[] = [];

  selectedGenres: string[] = [];
  title: string = "";
  subtitle: string = "";
  body: string = "";
  image: string = "";

  loadedData = false;
  errorMessage: string = "";
  message: string = "";

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

  constructor(private userService: UserService, private musicGenres: MusicGenreService, private countryService: CountriesService, private postService: PostService, private countryManager: CountryManagerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let postId = params.get("id") as any;
      this.postService.getPost(postId).subscribe((res) => {
        this.post = res;
        this.title = this.post.title;
        this.subtitle = this.post.subtitle;
        this.body = this.post.body;
        this.image = this.post.image;
        this.selectedCountry = this.post.country;
        this.selectedRegion = this.post.region;
        this.selectedCity = this.post.city;
        this.post.genres.forEach((genre: MusicGenre) => this.selectedGenres.push(genre.name));
        this.loadedData = true;
      })
    })
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

  editPost() {
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

      this.postService.updatePost(post, this.post.id).pipe(
        catchError(() => this.errorMessage = "An error occurred, please try again in a few minutes")
      ).subscribe((post: any) => {
        this.post = post;
        this.router.navigate(["/post", post.id])
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
        if (element) {
          this.addInvalidClass(element);
        }
      } else {
        if (element) {
          this.removeInvalidClass(element);
        }
      }
    }

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
