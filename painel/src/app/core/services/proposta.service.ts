import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PropostaBalao {
  valor: number;
  data: string;
}

export interface ClienteDto {
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  estadoCivil?: string;
}

export interface CreatePropostaRequest {
  unidadeId: number;
  cliente: ClienteDto;
  valorProposta: number;
  entradaProposta: number;
  quantidadeParcela?: number;
  valorParcela?: number;
  valorBens?: number;
  baloes?: PropostaBalao[];
}

@Injectable({
  providedIn: 'root'
})
export class PropostaService {
  private apiUrl = 'http://localhost:5135/api/propostas';

  constructor(private http: HttpClient) {}

  createProposta(request: CreatePropostaRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}
