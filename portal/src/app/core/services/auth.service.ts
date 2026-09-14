import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  fotoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  // States
  public currentUser = signal<Cliente | null>(null);
  public isLoggedIn = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);

  constructor() {
    this.checkLocalToken();
  }

  toggleModal() {
    this.isAuthModalOpen.set(!this.isAuthModalOpen());
  }

  private checkLocalToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('novuu_cliente_token');
      const userJson = localStorage.getItem('novuu_cliente_data');
      
      if (token && userJson) {
        try {
          const user = JSON.parse(userJson);
          this.currentUser.set(user);
          this.isLoggedIn.set(true);
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  public loginWithEmail(email: string, senha: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/clientes/login`, { email, senha });
  }

  public registerWithEmail(nome: string, email: string, senha: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/clientes/register`, { nome, email, senha });
  }

  public handleGoogleLogin(credential: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/clientes/google`, { credential });
  }

  public saveAuthData(response: any) {
    if (isPlatformBrowser(this.platformId)) {
      const user: Cliente = {
        id: response.clienteId,
        nome: response.nome,
        email: response.email,
        fotoUrl: response.fotoUrl
      };
      localStorage.setItem('novuu_cliente_token', response.token);
      localStorage.setItem('novuu_cliente_data', JSON.stringify(user));
      
      this.currentUser.set(user);
      this.isLoggedIn.set(true);
      this.isAuthModalOpen.set(false);
    }
  }

  public logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('novuu_cliente_token');
      localStorage.removeItem('novuu_cliente_data');
    }
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }
}
