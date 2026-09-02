import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardQualityItem {
  key: string;
  name: string;
  status: 'success' | 'warning' | 'alert';
  icon: string;
  description: string;
}

export interface PropertyRecommendation {
  empreendimentoId: number;
  empreendimentoNome: string;
  score: number;
  pendencias: string[];
}

export interface DashboardStatsResponse {
  kpis: {
    totalEmpreendimentos: number;
    empreendimentosEsteMes: number;
    empreendimentosTrendText: string;
    publicados: number;
    publicadosPercentText: string;
    emPreparacao: number;
    incompletosText: string;
    totalLeadsEsteMes: number;
    leadsTrendText: string;
  };
  precisamAtencao: Array<{
    id: number;
    nome: string;
    construtora: string;
    progresso: number;
    tag: string;
    botaoTexto: string;
    imagemUrl: string;
  }>;
  leadsRecentes: Array<{
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    empreendimentoNome: string;
    construtoraNome: string;
    status: string;
    createdAt: string;
  }>;
  indiceQualidade: {
    scoreGlobal: number;
    scoreLabel: string;
    items: DashboardQualityItem[];
    recomendacoes: PropertyRecommendation[];
  };
  empreendimentosPorTipo: {
    total: number;
    verticais: number;
    verticaisPercent: number;
    horizontais: number;
    horizontaisPercent: number;
    comerciais: number;
    comerciaisPercent: number;
    usoMisto: number;
    usoMistoPercent: number;
  };
  topConstrutoras: Array<{
    id: number;
    nome: string;
    logoUrl: string;
    empreendimentosCount: number;
  }>;
  desempenho: {
    visualizacoes: number;
    visualizacoesTrend: string;
    contatos: number;
    contatosTrend: string;
    leads: number;
    leadsTrend: string;
    publicados: number;
    publicadosTrend: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(construtoraId?: number): Observable<DashboardStatsResponse> {
    let params = new HttpParams();
    if (construtoraId && construtoraId > 0) {
      params = params.set('construtoraId', construtoraId.toString());
    }
    return this.http.get<DashboardStatsResponse>(`${this.apiUrl}/stats`, { params });
  }
}
