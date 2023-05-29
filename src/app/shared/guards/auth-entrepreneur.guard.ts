import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEntrepreneurGuard  {
  constructor(private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.getUser();
    if (user && this.isEntrepreneur(user)) {
      return true;
    }

    return false;
  }

  private isEntrepreneur(user: any) {
    return user.role.canManagePosts;
  }

}
