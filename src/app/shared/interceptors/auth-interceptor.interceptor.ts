import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.userService.getToken();
    if (!authToken) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      headers: request.headers.set('auth-token', authToken)
    });

    // Continuar con el siguiente interceptor o el manejador HTTP
    return next.handle(authRequest);
  }
}
