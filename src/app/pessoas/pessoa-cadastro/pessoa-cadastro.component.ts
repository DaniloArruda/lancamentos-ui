import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/components/common/api';
import { Pessoa } from './../../core/model';
import { PessoaService } from '../pessoa.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
  }

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Pessoa cadastrada com sucesso'});

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
