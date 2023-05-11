import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesData } from './interfaces/CountriesInterface';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';

    constructor(private http: HttpClient) { }

    getAllCountries(): Observable<CountriesData> {
        return this.http.get<CountriesData>(this.apiUrl, {
            headers: {
                'X-RapidAPI-Key': '516cd590b4mshd61ecf6bead6f7dp12b432jsn1fcbe0fca825',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });
    }
}