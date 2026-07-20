import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class LunaService {
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { message });
  }
}
