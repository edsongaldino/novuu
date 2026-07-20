import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cidade {
  id: number;
  nome: string;
  estadoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = '/api/cidades';

  constructor(private http: HttpClient) {}

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }
}
