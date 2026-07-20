import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Construtora {
  id?: number;
  nome: string;
  nomeAbreviado: string;
  cnpj: string;
  acessoDomus: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConstrutoraService {
  private apiUrl = '/api/construtoras';

  constructor(private http: HttpClient) {}

  getConstrutoras(): Observable<Construtora[]> {
    return this.http.get<Construtora[]>(this.apiUrl);
  }

  createConstrutora(item: Construtora): Observable<Construtora> {
    return this.http.post<Construtora>(this.apiUrl, item);
  }
}
