import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicGenre } from '../interfaces/MusicGenreInterface';

@Injectable({
  providedIn: 'root'
})
export class MusicGenreService {

  constructor(private http: HttpClient) { }

  private musicGenreUrl = 'http://localhost:3000/api/genres';

  getAllMusicGenres(): Observable<MusicGenre[]> {
    return this.http.get<MusicGenre[]>(this.musicGenreUrl);
  }
}
