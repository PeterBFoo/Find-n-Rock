import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { City } from 'src/app/shared/countries/interfaces/CitiesInterface';
import { Region } from 'src/app/shared/countries/interfaces/RegionsInterface';
import { SearchData } from './interfaces/SearchEventInterface';
import { CountryManagerService } from 'src/app/services/country/country-manager.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<SearchData>();

  genres!: MusicGenre[];
  selectedGenre: string = "";
  genresLoaded: boolean = false;

  countries!: Country[];
  countryData: string = "";
  selectedCountry: string = "";
  selectedCountryCode: string = "";

  regions: Region[] = [];
  regionData: string = "";
  selectedRegion: string = "";
  regionsLoaded: boolean = false;

  cities: City[] = [];
  selectedCity: string = "";
  citiesLoaded: boolean = false;

  dataLoaded: boolean = false;

  constructor(private genreService: MusicGenreService, private countryService: CountriesService, private countryManager: CountryManagerService) { }

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

  onSelectCountry(): void {
    this.countryManager.selectCountry(this);
  }

  onSelectRegion(): void {
    this.countryManager.selectRegion(this);
  }

  searchPosts(): void {
    let searchData: SearchData = {
      genres: this.selectedGenre,
      country: this.selectedCountry,
      region: this.selectedRegion,
      city: this.selectedCity
    }

    this.searchEvent.emit(searchData);
  }

  areFiltersActive(): boolean {
    return this.selectedGenre !== "" || this.selectedCountry !== "" || this.selectedRegion !== "" || this.selectedCity !== "";
  }

  removeFilters(): void {
    this.selectedGenre = "";
    this.countryData = "";
    this.selectedCountry = "";
    this.countryManager.removeSelectedCityAndRegion(this);

    this.searchPosts();
  }
}
