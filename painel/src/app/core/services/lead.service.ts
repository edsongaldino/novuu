import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  mensagem?: string;
  empreendimentoNome: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'http://localhost:5135/api/leads';

  constructor(private http: HttpClient) {}

  getLeadsByConstrutora(construtoraId: number): Observable<Lead[]> {
    const params = new HttpParams().set('construtoraId', construtoraId.toString());
    return this.http.get<Lead[]>(this.apiUrl, { params });
  }
}
