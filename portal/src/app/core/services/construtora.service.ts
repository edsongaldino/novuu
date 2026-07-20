import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5135/api/construtoras';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Construtora[]> {
    return this.http.get<Construtora[]>(this.apiUrl);
  }
}
