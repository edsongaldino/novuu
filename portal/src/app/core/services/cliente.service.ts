import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface ClientePerfil {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cidade?: string;
  fotoUrl?: string;
  prefEmail: boolean;
  prefComunicacoes: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/clientes/perfil`;

  getPerfil(): Observable<ClientePerfil> {
    return this.http.get<ClientePerfil>(this.apiUrl);
  }

  updatePerfil(data: { nome: string, email: string, telefone?: string, cidade?: string }): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }

  updateSenha(novaSenha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/senha`, { novaSenha });
  }

  updatePreferencias(prefEmail: boolean, prefComunicacoes: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferencias`, { prefEmail, prefComunicacoes });
  }
}
