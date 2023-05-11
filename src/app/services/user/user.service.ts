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

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super(UserService)
  }

  getUser(): User {
    return this.userInRequest;
  }

  setUser(user: User) {
    this.userInRequest = user;
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
    this.cookieService.set("auth-token", token, 7, "/");
  }

  getToken() {
    return this.cookieService.get("auth-token");
  }

  logout() {
    this.cookieService.delete("auth-token", "/");
  }

  signup(user: any): Observable<any> {
    return this.http.post<User>("http://localhost:3000/api/register", user);
  }
}
