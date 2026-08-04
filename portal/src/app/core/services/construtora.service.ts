import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Construtora {
  id: number;
  nome: string;
  nomeAbreviado?: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConstrutoraService {
  private apiUrl = `${environment.apiUrl}/api/construtoras`;

  constructor(private http: HttpClient) {}

  listAll(): Observable<Construtora[]> {
    return this.http.get<Construtora[]>(this.apiUrl);
  }
}
