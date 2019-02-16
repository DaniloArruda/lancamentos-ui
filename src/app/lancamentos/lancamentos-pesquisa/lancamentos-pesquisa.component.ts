import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';

import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  totalRegistros = 0;

  @ViewChild('tabela') tabela: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.excluir(lancamento);
        }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.atualizarTabela();

        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento excluído'
        });
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  atualizarTabela() {
    const pagina = this.tabela.first / this.tabela.rows;
    this.pesquisar(pagina);
  }
}
