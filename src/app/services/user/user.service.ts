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

  private userInRequest!: User | null;
  private baseUrl = environment.apiUrl;

  private profile = this.baseUrl + '/auth/profile';
  private loginUrl = this.baseUrl + '/login';
  private logoutUrl = this.baseUrl + '/logout';
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
    localStorage.setItem('auth-token', token);
    this.cookieService.set('auth-token', token);
  }

  getToken() {
    let token = this.cookieService.get('auth-token');
    token = token ? token : localStorage.getItem('auth-token')!;

    return token;
  }

  logout() {
    this.http.post<any>(this.logoutUrl, {}, {
      withCredentials: true
    }).subscribe(() => {
      this.removeToken();
      this.removeUser();
    });
  }

  private removeUser() {
    this.userInRequest = null;
    localStorage.removeItem('user');
  }

  private removeToken() {
    this.cookieService.delete('auth-token');
    localStorage.removeItem('auth-token');
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
