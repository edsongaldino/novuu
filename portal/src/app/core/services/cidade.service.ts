import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Cidade {
  id: number;
  nome: string;
  estadoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = `${environment.apiUrl}/api/cidades`;

  constructor(private http: HttpClient) {}

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }
}
