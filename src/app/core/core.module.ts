import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    CategoriaService,

    MessageService,
    ConfirmationService,
    Title,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
