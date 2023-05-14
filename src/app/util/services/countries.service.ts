import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesData } from './interfaces/CountriesInterface';
import { Region } from './interfaces/RegionsInterface';
import { City } from './interfaces/CitiesInterface';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private countriesUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';
    private apiKey = '516cd590b4mshd61ecf6bead6f7dp12b432jsn1fcbe0fca825';
    private apiHost = 'wft-geo-db.p.rapidapi.com';

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