import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from './../../core/model';
import { PessoaService } from '../pessoa.service';

import { MessageService } from 'primeng/components/common/api';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  editando = false;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    this.verificarEdicao();
  }

  verificarEdicao() {
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.pessoaService.buscarPorCodigo(codigo)
        .then(pessoa => {
          this.pessoa = pessoa;
          this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
          this.editando = true;
        });
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Pessoa cadastrada com sucesso!'});

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.messageService.add({severity: 'success', summary: 'Pessoa atualizada com sucesso!'});

        this.pessoa = pessoa;
      });
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['/pessoa/nova']);
  }

}
