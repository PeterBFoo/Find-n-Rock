import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicGenre } from '../interfaces/MusicGenreInterface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MusicGenreService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl;
  private musicGenreUrl = this.baseUrl + '/genres';

  getAllMusicGenres(): Observable<MusicGenre[]> {
    return this.http.get<MusicGenre[]>(this.musicGenreUrl);
  }
}
