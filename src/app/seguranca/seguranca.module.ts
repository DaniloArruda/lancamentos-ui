import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    FormsModule,
    CommonModule,

    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [ /localhost:8080/ ],
        blacklistedRoutes: [ /\/oauth\/token/ ]
      }
    })
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard
  ]
})
export class SegurancaModule { }
