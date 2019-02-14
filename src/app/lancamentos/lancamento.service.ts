import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  salvar(lancamento: Lancamento) {
    return this.http.post(this.lancamentosUrl, lancamento)
      .toPromise()
      .then(response => response);
  }

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params: params })
      .toPromise()
      .then(response => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response as any;
        lancamento.dataVencimento = this.converterStringParaData(lancamento.dataVencimento);
        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = this.converterStringParaData(lancamento.dataPagamento);
        }
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(response => {
        const lancamentoSalvo = response as any;
        lancamentoSalvo.dataVencimento = this.converterStringParaData(lancamentoSalvo.dataVencimento);
        if (lancamentoSalvo.dataPagamento) {
          lancamentoSalvo.dataPagamento = this.converterStringParaData(lancamentoSalvo.dataPagamento);
        }
        return lancamentoSalvo;
      });
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringParaData(data: string): Date {
    return new Date(data);
  }
}
