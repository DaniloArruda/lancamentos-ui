import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from './../core/model';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  salvar(pessoa: Pessoa) {
    return this.http.post(this.pessoasUrl, pessoa)
      .toPromise()
      .then(response => response);
  }

  pesquisaSimples() {
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => {
        const resultado = {
          pessoas: response['content'],
          total: response['totalElements']
        };

        return resultado;
      });
  }

  pesquisar(filtro: PessoaFiltro) {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        const resultado = {
          pessoas: response['content'],
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status, { headers })
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(codigo: number) {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response as any);
  }

  atualizar(pessoa: Pessoa) {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => response as any);
  }
}
