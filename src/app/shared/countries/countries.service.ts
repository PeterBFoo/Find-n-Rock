import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from './interfaces/RegionsInterface';
import { City } from './interfaces/CitiesInterface';
import { Country } from './interfaces/CountryInterface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private countriesUrl = environment.countriesUrl;
    private apiKey = environment.apiKey;
    private header = {
        'X-CSCAPI-KEY': this.apiKey
    }

    constructor(private http: HttpClient) { }

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.countriesUrl}`, {
            headers: this.header
        });
    }

    getRegionsOfCountry(countryCode: string): Observable<Region[]> {
        return this.http.get<Region[]>(this.getUrlOfRegions(countryCode), {
            headers: this.header
        });
    }

    getCitiesOfRegionAndContry(countryCode: string, regionCode: string): Observable<City[]> {
        return this.http.get<City[]>(this.getUrlOfCity(countryCode, regionCode), {
            headers: this.header
        });
    }

    private getUrlOfRegions(countryCode: string): string {
        return `${this.countriesUrl}/${countryCode}/states`;
    }

    private getUrlOfCity(countryCode: string, regionCode: string): string {
        return `${this.countriesUrl}/${countryCode}/states/${regionCode}/cities`;
    }
}