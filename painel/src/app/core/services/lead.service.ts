import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeadItem {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  mensagem?: string;
  empreendimentoNome: string;
  empreendimentoId?: number;
  construtoraId?: number;
  construtoraNome?: string;
  origem?: string; // 'Site' | 'Instagram' | 'Indicação' | 'Facebook Ads'
  status: string; // 'Novo' | 'Em atendimento' | 'Proposta enviada' | 'Convertido' | 'Perdido'
  responsavel?: string;
  createdAt: string;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = '/api/leads';

  constructor(private http: HttpClient) {}

  getLeads(construtoraId?: number): Observable<LeadItem[]> {
    let params = new HttpParams();
    if (construtoraId && construtoraId > 0) {
      params = params.set('construtoraId', construtoraId.toString());
    }
    return this.http.get<LeadItem[]>(this.apiUrl, { params });
  }

  getLeadsByConstrutora(construtoraId: number): Observable<LeadItem[]> {
    return this.getLeads(construtoraId);
  }

  createLead(data: Partial<LeadItem>): Observable<LeadItem> {
    return this.http.post<LeadItem>(this.apiUrl, data);
  }

  updateLead(id: number, data: Partial<LeadItem>): Observable<LeadItem> {
    return this.http.put<LeadItem>(`${this.apiUrl}/${id}`, data);
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
