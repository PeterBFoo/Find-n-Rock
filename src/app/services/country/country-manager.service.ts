import { Injectable } from '@angular/core';

/**
 * [ CountryManagerService ]
 * 
 * This service is used to manage the country, region and city selection.
 * In order to make this functional, you will need to set the variables defined in the  interface CountryManagerInterface.
 * 
 * To display in the html, you will have to bind the selectors to the variables defined in the interface. In this case, country and region. Example:
 * 
 * <select class="form-control" [(ngModel)]="countryData" (change)="countryManager.selectCountry(this)">
 * 
 * The value of the option will be the country code and the country name separated by a comma. Example:
 * 
 * <ng-option *ngFor="let country of countries" [value]="country.iso2 + ',' + country.name {{ country.name }} </ng-option>
 * 
 * It applies similarly to the region options, diference is that you will need to set the first value to the selectedCountryCode. Example:
 * 
 * ng-option *ngFor="let region of regions" [value]="selectedCountryCode + ',' + region.iso2 + ',' + region.name"> {{ region.name }} </ng-option>
 * 
 * 
 * In order to make cities also work: 
 * 
 * <ng-select [(ngModel)]="selectedCity" name="selectedCity" id="city"> 
 * <ng-option value="" disabled selected>Choose a city</ng-option> 
 * <ng-option *ngFor="let city of cities" [value]="city.name">{{ city.name }}</ng-option> </ng-select>
 * 
 * ngModel will be the selected city, and the value of the option will be the city name.
 */

@Injectable({
  providedIn: 'root'
})
export class CountryManagerService {

  constructor() { }

  selectCountry(component: any) {
    if (component.countryData === "" || component.countryData === null) {
      component.selectedCountry = "";
      this.removeSelectedCityAndRegion(component);
      return;
    }

    let countryInfo = component.countryData.split(',');
    component.selectedCountryCode = countryInfo[0];
    component.selectedCountry = countryInfo[1];
    this.removeSelectedCityAndRegion(component);

    component.countryService.getRegionsOfCountry(component.selectedCountryCode).subscribe((regions: any) => {
      component.regions = regions;

      if (regions.length > 0) {
        component.regionsLoaded = true;
      }
    });
  }

  selectRegion(component: any) {
    if (component.regionData === null) {
      component.selectedRegion = "";
      this.removeSelectedCity(component);
      return;
    }

    let regionInfo = component.regionData.split(',');
    let countryCode = regionInfo[0];
    let regionCode = regionInfo[1];
    component.selectedRegion = regionInfo[2];

    this.removeSelectedCity(component);

    component.countryService.getCitiesOfRegionAndContry(countryCode, regionCode).subscribe((cities: any) => {
      component.cities = cities;

      if (cities.length > 0) {
        component.citiesLoaded = true;
      }
    });
  }

  removeSelectedCityAndRegion(component: any): void {
    this.removeSelectedRegion(component);
    this.removeSelectedCity(component);
  }

  private removeSelectedRegion(component: any): void {
    component.regionsLoaded = false;
    component.regions = [];
    component.regionData = "";
    component.selectedRegion = "";
  }

  private removeSelectedCity(component: any): void {
    component.citiesLoaded = false;
    component.cities = [];
    component.selectedCity = "";
  }
}
