import { Component, EventEmitter, Output } from '@angular/core';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { SearchData } from '../searcher/interfaces/SearchEventInterface';

@Component({
  selector: 'app-user-searcher',
  templateUrl: './user-searcher.component.html',
  styleUrls: ['./user-searcher.component.scss']
})
export class UserSearcherComponent {
  @Output() searchUsersEvent = new EventEmitter<any>();

  genres!: MusicGenre[];
  selectedGenre: string = "";
  genresLoaded: boolean = false;

  countries!: Country[];
  selectedCountry: string = "";

  dataLoaded: boolean = false;

  constructor(private genreService: MusicGenreService, private countryService: CountriesService) { }

  ngOnInit(): void {
    this.genreService.getAllMusicGenres().subscribe((genres) => {
      this.genres = genres;
      this.genresLoaded = true;
    })

    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
      this.dataLoaded = true
    })
  }


  searchUsers(): void {
    let searchData: any = {
      genre: this.selectedGenre,
      country: this.selectedCountry
    }

    this.searchUsersEvent.emit(searchData);
  }

  areFiltersActive(): boolean {
    return this.selectedGenre !== "" || this.selectedCountry !== "";
  }

  removeFilters(): void {
    this.selectedGenre = "";
    this.selectedCountry = "";
    this.searchUsers();
  }
}
