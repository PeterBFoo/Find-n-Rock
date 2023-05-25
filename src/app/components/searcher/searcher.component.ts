import { combineLatest } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { CountriesService } from 'src/app/shared/countries/countries.service';
import { Country } from 'src/app/shared/countries/interfaces/CountryInterface';
import { City } from 'src/app/shared/countries/interfaces/CitiesInterface';
import { Region } from 'src/app/shared/countries/interfaces/RegionsInterface';
import { SearchData } from './interfaces/SearchEventInterface';

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

  regions: Region[] = [];
  regionData: string = "";
  selectedRegion: string = "";
  regionsLoaded: boolean = false;

  cities: City[] = [];
  selectedCity: string = "";
  citiesLoaded: boolean = false;

  dataLoaded: boolean = false;

  constructor(private genreService: MusicGenreService, private countryService: CountriesService) { }

  ngOnInit(): void {
    this.genreService.getAllMusicGenres().subscribe((genres) => {
      this.genres = genres;
      this.genresLoaded = true;
    })

    this.countryService.getAllCountries().subscribe((countries) => {
      this.countries = countries.data;
      this.dataLoaded = true
    })
  }

  onSelectCountry(): void {
    if (this.countryData === "") {
      this.selectedCountry = "";
      this.removeSelectedCityAndRegion();
      return;
    }

    let countryInfo = this.countryData.split(',');
    let countryCode = countryInfo[0];
    this.selectedCountry = countryInfo[1];
    this.removeSelectedCityAndRegion();

    this.countryService.getRegionsOfCountry(countryCode).subscribe((regions: any) => {
      this.regions = regions.data;
      this.regionsLoaded = true;
    });
  }

  onSelectRegion(): void {
    let regionInfo = this.regionData.split(',');
    let countryCode = regionInfo[0];
    let regionCode = regionInfo[1];
    this.selectedRegion = regionInfo[2];

    this.removeSelectedCity();

    this.countryService.getCitiesOfRegionAndContry(countryCode, regionCode).subscribe((cities: any) => {
      this.cities = cities.data;
      this.citiesLoaded = true;
    });
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
    this.removeSelectedCityAndRegion();

    this.searchPosts();
  }

  private removeSelectedCityAndRegion(): void {
    this.removeSelectedRegion();
    this.removeSelectedCity();
  }

  private removeSelectedRegion(): void {
    this.regionsLoaded = false;
    this.regions = [];
    this.regionData = "";
    this.selectedRegion = "";
  }

  private removeSelectedCity(): void {
    this.citiesLoaded = false;
    this.cities = [];
    this.selectedCity = "";
  }
}
