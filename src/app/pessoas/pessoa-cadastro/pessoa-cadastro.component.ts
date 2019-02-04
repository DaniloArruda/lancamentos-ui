import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/components/common/api';
import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';

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
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
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
