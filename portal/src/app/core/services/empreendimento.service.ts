import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface EmpreendimentoListItem {
  id: number;
  nome: string;
  construtoraNome: string;
  tipo: string;
  valorInicial?: number;
  valorFinal?: number;
  previsaoEntrega?: string;
  logomarca?: string;
  descricao?: string;
}

export interface AutocompleteResult {
  id: number;
  texto: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpreendimentoService {
  private apiUrl = `${environment.apiUrl}/api/empreendimentos`;

  constructor(private http: HttpClient) {}

  search(params: {
    query?: string;
    cidadeId?: number;
    bairroId?: number;
    precoMinimo?: number;
    precoMaximo?: number;
    tipo?: string;
    construtoraId?: number;
  }): Observable<EmpreendimentoListItem[]> {
    let httpParams = new HttpParams();
    if (params.query) httpParams = httpParams.set('query', params.query);
    if (params.cidadeId) httpParams = httpParams.set('cidadeId', params.cidadeId.toString());
    if (params.bairroId) httpParams = httpParams.set('bairroId', params.bairroId.toString());
    if (params.precoMinimo) httpParams = httpParams.set('precoMinimo', params.precoMinimo.toString());
    if (params.precoMaximo) httpParams = httpParams.set('precoMaximo', params.precoMaximo.toString());
    if (params.tipo) httpParams = httpParams.set('tipo', params.tipo);
    if (params.construtoraId) httpParams = httpParams.set('construtoraId', params.construtoraId.toString());

    return this.http.get<EmpreendimentoListItem[]>(this.apiUrl, { params: httpParams });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAutocomplete(query: string): Observable<AutocompleteResult[]> {
    return this.http.get<AutocompleteResult[]>(`${this.apiUrl}/autocomplete`, {
      params: new HttpParams().set('query', query)
    });
  }
}
