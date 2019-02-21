import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAccessTokenInvalido()) {
      console.log('Access token inválido... Obtendo novo access token...');

      this.authService.obterNovoAccessToken()
        .then(() => {
          if (this.authService.isAccessTokenInvalido()) {
            this.router.navigate(['/login']);
            return false;
          }

          return true;
        });
    } else if (next.data.roles && this.authService.naoTemNenhumaPermissao(next.data.roles)) {
      this.router.navigate(['/acesso-negado']);
      return false;
    }

    return true;
  }
}
