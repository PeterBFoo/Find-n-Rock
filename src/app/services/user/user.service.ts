import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/UserInterface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RootInjectorGuard } from '../../util/guards/rootInjectionGuard';


@Injectable({
  providedIn: 'root'
})
export class UserService extends RootInjectorGuard {

  private userInRequest!: User;
  private profile = 'http://localhost:3000/api/auth/profile';
  private loginUrl = 'http://localhost:3000/api/login';
  private signupUrl = 'http://localhost:3000/api/register';
  private updateUserUrl = 'http://localhost:3000/api/auth/profile/edit';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super(UserService)
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
      headers: {
        "authorization": `Bearer ${this.getToken()}`
      },
      withCredentials: true
    })
  }

  login(username: string, password: string): Observable<any> {
    let body = { username: username, password: password };
    return this.http.post<any>(this.loginUrl, body);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  signup(user: any): Observable<any> {
    return this.http.post<User>(this.signupUrl, user);
  }

  updateUser(changes: any): Observable<User> {
    return this.http.post<User>(this.updateUserUrl, changes, {
      headers: {
        "authorization": `Bearer ${this.getToken()}`
      },
      withCredentials: true
    });
  }
}
