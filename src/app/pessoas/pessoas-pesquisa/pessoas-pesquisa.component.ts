import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from '../pessoa.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = [];
  totalRegistros = 0;

  @ViewChild('tabela') tabela: any;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${pessoa.nome} ?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.atualizarTabela();

        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa excluída com sucesso'
        });
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  mudarStatus(pessoa: any) {
    const status = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, status)
      .then(() => {
        const pagina = this.tabela.first / this.tabela.rows;
        this.pesquisar(pagina);

        const descricaoStatus = status ? 'ativado(a)' : 'desativado(a)';
        const msg = `${pessoa.nome} ${descricaoStatus}`;

        this.messageService.add({
          severity: 'success',
          summary: msg
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTabela() {
    const pagina = this.tabela.first / this.tabela.rows;
    this.pesquisar(pagina);
  }
}
