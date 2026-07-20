import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Empreendimento {
  id?: number;
  nome: string;
  descricao?: string;
  tipo: string;
  valorInicial?: number;
  valorFinal?: number;
  previsaoEntrega?: string;
  qtdeTorre: number;
  qtdeQuadra: number;
  status: string;
  logomarca?: string;
  latitude?: number;
  longitude?: number;
  construtora?: {
    nome: string;
    nomeAbreviado: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EmpreendimentoService {
  private apiUrl = '/api/empreendimentos';

  constructor(private http: HttpClient) {}

  getEmpreendimentos(): Observable<Empreendimento[]> {
    return this.http.get<Empreendimento[]>(`${this.apiUrl}/list`);
  }

  updateEmpreendimento(id: number, data: Empreendimento): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, data);
  }

  createEmpreendimento(data: Empreendimento): Observable<Empreendimento> {
    return this.http.post<Empreendimento>(this.apiUrl, data);
  }

  importXml(file: File): Observable<Empreendimento> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Empreendimento>(`${this.apiUrl}/import-xml`, formData);
  }

  uploadPhoto(id: number, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/${id}/upload-photo`, formData);
  }
}
