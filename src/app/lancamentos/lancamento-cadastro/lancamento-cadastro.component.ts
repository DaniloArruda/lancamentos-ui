import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/components/common/api';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoaService, PessoaFiltro } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  editando = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
    this.verificarEdicao();
  }

  carregarCategorias() {
    this.categoriaService.buscarTodas().then(categorias => {
      this.categorias = categorias;
    });
  }

  carregarPessoas() {
    const filtro = new PessoaFiltro();
    this.pessoaService.pesquisar(filtro).then(response => {
      this.pessoas = response.pessoas;
    });
  }

  verificarEdicao() {
    if (this.route.snapshot.params['codigo']) {
      const codigo = this.route.snapshot.params['codigo'];
      this.lancamentoService.buscarPorCodigo(codigo)
        .then(lancamento => this.lancamento = lancamento)
        .catch(erro => this.errorHandler.handle(erro));

      this.editando = true;
    }
  }

  submit(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.salvar(form);
    }
  }

  private atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Lançamento atualizado com sucesso'});

        form.reset();
        this.lancamento = new Lancamento();
      });
  }

  private salvar(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Lançamento cadastro com sucesso'});

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl)  {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamento/novo']);
  }
}
