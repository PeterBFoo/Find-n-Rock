import { combineLatest } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicGenre } from 'src/app/services/interfaces/MusicGenreInterface';
import { MusicGenreService } from 'src/app/services/musicGenre/music-genre.service';
import { CountriesService } from 'src/app/util/services/countries.service';
import { Country } from 'src/app/util/services/interfaces/CountryInterface';
import { City } from 'src/app/util/services/interfaces/CitiesInterface';
import { Region } from 'src/app/util/services/interfaces/RegionsInterface';
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

  countries!: Country[];
  selectedCountry: string = "";

  regions: Region[] = [];
  selectedRegion: string = "";
  regionsLoaded: boolean = false;

  cities: City[] = [];
  selectedCity: string = "";
  citiesLoaded: boolean = false;

  dataLoaded: boolean = false;

  constructor(private genreService: MusicGenreService, private countryService: CountriesService) { }

  ngOnInit(): void {
    combineLatest([
      this.genreService.getAllMusicGenres(),
      this.countryService.getAllCountries()
    ]).subscribe(([genres, countries]) => {
      this.genres = genres;
      this.countries = countries.data;
      this.dataLoaded = true;
    });
  }

  onSelectGenre($e: any): void {
    this.selectedGenre = $e.target.value;
  }

  onSelectCountry($e: any): void {
    if ($e.target.value === "") {
      this.selectedCountry = "";
      this.removeSelectedCityAndRegion();
      return;
    }

    let countryInfo = $e.target.value.split(',');
    let countryCode = countryInfo[0];
    this.selectedCountry = countryInfo[1];
    this.removeSelectedCityAndRegion();

    this.countryService.getRegionsOfCountry(countryCode).subscribe((regions: any) => {
      this.regions = regions.data;
      this.regionsLoaded = true;
    });
  }

  onSelectRegion($e: any): void {
    if ($e.target.value === "") {
      this.selectedRegion = "";
      this.removeSelectedCity();
      return;
    }

    let regionInfo = $e.target.value.split(',');

    let countryCode = regionInfo[0];
    let regionCode = regionInfo[1];
    let regionName = regionInfo[2];

    this.selectedRegion = regionName;
    this.removeSelectedCity();

    this.countryService.getCitiesOfRegionAndContry(countryCode, regionCode).subscribe((cities: any) => {
      this.cities = cities.data;
      this.citiesLoaded = true;
    });
  }

  onSelectCity($e: any): void {
    this.selectedCity = $e.target.value;
  }

  searchPosts(): void {
    let searchData: SearchData = {
      genre: this.selectedGenre,
      country: this.selectedCountry,
      region: this.selectedRegion,
      city: this.selectedCity
    }

    this.searchEvent.emit(searchData);
  }

  private removeSelectedCityAndRegion(): void {
    this.removeSelectedRegion();
    this.removeSelectedCity();
  }

  private removeSelectedRegion(): void {
    this.regionsLoaded = false;
    this.regions = [];
    this.selectedRegion = "";
  }

  private removeSelectedCity(): void {
    this.citiesLoaded = false;
    this.cities = [];
    this.selectedCity = "";
  }
}
