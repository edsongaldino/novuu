import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cidade {
  id?: number;
  nome: string;
  status?: string;
}

export interface Bairro {
  id?: number;
  cidadeId?: number;
  nome: string;
  cidade?: {
    nome: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseCidadeUrl = 'http://localhost:5135/api/cidades';
  private baseBairroUrl = 'http://localhost:5135/api/bairros';

  constructor(private http: HttpClient) {}

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.baseCidadeUrl);
  }

  createCidade(data: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.baseCidadeUrl, data);
  }

  getBairros(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(this.baseBairroUrl);
  }

  createBairro(data: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(this.baseBairroUrl, data);
  }
}
