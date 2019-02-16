import { AuthService } from '../auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isAccessTokenInvalido()) {
      console.log('Access token expirado. Obter um novo access token...');
      this.authService.obterNovoAccessToken()
        .then(() => {
          return next.handle(req);
        });
    }
    return next.handle(req);
  }
}
