import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesData } from './interfaces/CountriesInterface';
import { Region } from './interfaces/RegionsInterface';
import { City } from './interfaces/CitiesInterface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private countriesUrl = environment.countriesUrl;
    private apiKey = environment.apiKey;
    private apiHost = environment.apiHost;

    constructor(private http: HttpClient) { }

    getAllCountries(): Observable<CountriesData> {
        return this.http.get<CountriesData>(this.countriesUrl, {
            headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': this.apiHost,
            }
        });
    }

    getRegionsOfCountry(countryCode: string): Observable<Region[]> {
        return this.http.get<Region[]>(this.getUrlOfRegions(countryCode), {
            headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': this.apiHost,
            }
        });
    }

    getCitiesOfRegionAndContry(countryCode: string, regionCode: string): Observable<City[]> {
        return this.http.get<City[]>(this.getUrlOfCity(countryCode, regionCode), {
            params: { types: 'CITY' },
            headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': this.apiHost,
            }
        });
    }

    private getUrlOfRegions(countryCode: string): string {
        return this.countriesUrl + '/' + countryCode + '/regions';
    }

    private getUrlOfCity(countryCode: string, regionCode: string): string {
        return this.countriesUrl + '/' + countryCode + '/regions/' + regionCode + '/cities';
    }
}