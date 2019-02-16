import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-acesso-negado',
  template: `
    <div class="container">
      <h1 style="text-align: center;">Acesso negado</h1>
    </div>
  `,
  styles: []
})
export class PaginaAcessoNegadoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Acesso negado');
  }

}
