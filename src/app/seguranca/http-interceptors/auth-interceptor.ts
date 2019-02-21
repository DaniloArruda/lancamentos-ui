import { AuthService } from '../auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class NotAuthenticatedError {}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  quantidadeChamadas = 0;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.quantidadeChamadas < 2) {
      if (this.authService.isAccessTokenInvalido()) {
        console.log('Access token expirado. Obter um novo access token...');
        this.quantidadeChamadas++;

        this.authService.obterNovoAccessToken()
          .then(() => {
            this.quantidadeChamadas = 0;
            if (this.authService.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }
            return next.handle(req);
          });
      }
    }
    this.quantidadeChamadas = 0;
    if (req.url !== this.authService.oauthTokenUrl) {
      if (this.authService.isAccessTokenInvalido()) {
        throw new NotAuthenticatedError();
      }
    }

    return next.handle(req);
  }
}
