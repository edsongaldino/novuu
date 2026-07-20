import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  userName: string;
  construtoraId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5135/api/auth';
  
  // Reactive signals for login state
  isLoggedIn = signal(false);
  userName = signal('');
  construtoraId = signal<number | null>(null);

  constructor(private http: HttpClient) {
    // Restore session on startup if in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      const name = localStorage.getItem('admin_name');
      const cid = localStorage.getItem('admin_construtora_id');
      
      if (token && name && cid) {
        this.isLoggedIn.set(true);
        this.userName.set(name);
        this.construtoraId.set(parseInt(cid, 10));
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_token', res.token);
          localStorage.setItem('admin_name', res.userName);
          localStorage.setItem('admin_construtora_id', res.construtoraId.toString());
        }
        this.isLoggedIn.set(true);
        this.userName.set(res.userName);
        this.construtoraId.set(res.construtoraId);
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_name');
      localStorage.removeItem('admin_construtora_id');
    }
    this.isLoggedIn.set(false);
    this.userName.set('');
    this.construtoraId.set(null);
  }
}
