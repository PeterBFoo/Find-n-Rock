import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/UserInterface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Entrepreneur } from './interfaces/EntrepreneurInterface';
import { MusicGroup } from './interfaces/MusicGroupInterface';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInRequest!: User;
  private baseUrl = environment.apiUrl;

  private profile = this.baseUrl + '/auth/profile';
  private loginUrl = this.baseUrl + '/login';
  private signupUrl = this.baseUrl + '/register';
  private updateUserUrl = this.baseUrl + '/auth/profile/edit';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUser(): User {
    return this.userInRequest ? this.userInRequest : JSON.parse(localStorage.getItem('user')!);
  }

  setUser(user: User) {
    this.userInRequest = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.profile, {
      withCredentials: true
    })
  }

  login(username: string, password: string): Observable<any> {
    let body = { username: username, password: password };
    return this.http.post<any>(this.loginUrl, body);
  }

  setToken(token: string) {
    this.cookieService.set('auth-token', token);
  }

  getToken() {
    return this.cookieService.get('auth-token');
  }

  logout() {
    this.cookieService.delete('auth-token');
    localStorage.removeItem('user');
  }

  signupMusicGroup(user: MusicGroup): Observable<any> {
    return this.http.post<User>(this.signupUrl, user);
  }

  signupEntrepreneur(user: Entrepreneur): Observable<any> {
    return this.http.post<User>(this.signupUrl, user);
  }

  updateUser(changes: any): Observable<User> {
    return this.http.post<User>(this.updateUserUrl, changes, {
      withCredentials: true
    });
  }
}
