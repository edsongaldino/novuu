import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FotoItem {
  id: number;
  empreendimentoId: number;
  arquivo: string;
  url: string;
  tipo: string;
  destaquePrincipal: boolean;
  destaqueCarrossel?: boolean;
  nome?: string;
  uploading?: boolean;
  selected?: boolean;
}

export interface EnderecoItem {
  id?: number;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  bairro?: { id?: number; nome: string };
  cidade?: { id?: number; nome: string };
  estado?: { id?: number; uf: string };
  latitude?: number;
  longitude?: number;
}

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
  imagemUrl?: string;
  latitude?: number;
  longitude?: number;
  enderecoId?: number;
  endereco?: EnderecoItem;
  instagram?: string;
  facebook?: string;
  video?: string;
  linkTour?: string;
  standLocalizacao?: string;
  standHorario?: string;
  comissao?: string;
  seoTitle?: string;
  seoDescription?: string;
  construtoraId?: number;
  construtora?: {
    id?: number;
    nome: string;
    nomeAbreviado: string;
  };
  estagioAtual?: string;
  estagioLancamentoData?: string;
  estagioFundacaoData?: string;
  estagioEstruturaData?: string;
  estagioAlvenariaData?: string;
  estagioAcabamentosData?: string;
  torres?: any[];
  quadras?: any[];
  subtipo?: string;
  variacao?: string;
  ocultarValor?: string;
  previsaoCondominio?: number;
  rendaFamiliar?: number;
  plantaPrincipalId?: number;
  modalidade?: string;
  tours360?: Array<{ id?: number; link: string; titulo: string }>;
  createdAt?: string;
  updatedAt?: string;
  plantasCount?: number;
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

  getEmpreendimentoById(id: number): Observable<Empreendimento> {
    return this.http.get<Empreendimento>(`${this.apiUrl}/${id}`);
  }

  getDiferenciais(id: number): Observable<{ lazer: any[]; diferenciais: any[]; todas: any[] }> {
    return this.http.get<{ lazer: any[]; diferenciais: any[]; todas: any[] }>(`${this.apiUrl}/${id}/diferenciais`);
  }

  getPlantas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/plantas`);
  }

  updateEmpreendimento(id: number, data: Empreendimento): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, data);
  }

  updateEndereco(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/endereco`, data);
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

  getFotosGerenciamento(empId: number): Observable<FotoItem[]> {
    return this.http.get<FotoItem[]>(`${this.apiUrl}/${empId}/fotos-gerenciamento`);
  }

  uploadFotoGerenciamento(empId: number, file: File, tipo?: string): Observable<FotoItem> {
    const formData = new FormData();
    formData.append('file', file);
    if (tipo) formData.append('tipo', tipo);
    return this.http.post<FotoItem>(`${this.apiUrl}/${empId}/upload-foto-gerenciamento`, formData);
  }

  updateFoto(fotoId: number, data: { tipo?: string; nome?: string; destaquePrincipal?: boolean; destaqueCarrossel?: boolean }): Observable<any> {
    return this.http.put(`${this.apiUrl}/fotos/${fotoId}`, data);
  }

  deleteFoto(fotoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fotos/${fotoId}`);
  }

  setFotoPrincipal(empId: number, fotoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${empId}/foto-principal/${fotoId}`, {});
  }
}
