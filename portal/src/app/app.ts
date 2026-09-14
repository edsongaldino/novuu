import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { LunaService } from './core/services/luna.service';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected title = 'Lançamentos Online';
  private lunaService = inject(LunaService);
  public authService = inject(AuthService);
  private router = inject(Router);

  // Luna Chat signals
  protected showChat = signal(false);
  protected chatMessages = signal<Array<{ sender: 'user' | 'luna', text: string }>>([]);
  protected currentChatMessage = '';

  // Auth Modal State
  protected authMode = signal<'login' | 'register'>('login');
  protected authForm = {
    nome: '',
    email: '',
    senha: ''
  };
  protected isSubmittingAuth = signal(false);
  protected isUserMenuOpen = signal(false);

  // Luna Chat methods
  protected toggleChat() {
    const nextState = !this.showChat();
    this.showChat.set(nextState);
    
    // Add initial message if opening and empty
    if (nextState && this.chatMessages().length === 0) {
      this.chatMessages.set([
        { sender: 'luna', text: 'Olá! Sou a **Luna**, sua especialista digital em imóveis em Cuiabá. Pergunte-me sobre os lançamentos da Plaenge ou da Ginco!' }
      ]);
    }
  }

  protected sendChatMessage() {
    const text = this.currentChatMessage.trim();
    if (!text) return;

    // Add user message
    this.chatMessages.update(msgs => [...msgs, { sender: 'user', text }]);
    this.currentChatMessage = '';

    // Call API chatbot endpoint
    this.lunaService.sendMessage(text).subscribe({
      next: (res) => {
        this.chatMessages.update(msgs => [...msgs, { sender: 'luna', text: res.reply }]);
      },
      error: (err) => {
        console.error('Erro no chatbot:', err);
        this.chatMessages.update(msgs => [...msgs, { sender: 'luna', text: 'Desculpe, tive um probleminha para me conectar. Pode tentar de novo?' }]);
      }
    });
  }

  protected toggleAuthMode(e: Event) {
    e.preventDefault();
    this.authMode.set(this.authMode() === 'login' ? 'register' : 'login');
  }

  protected submitAuth() {
    if (!this.authForm.email || !this.authForm.senha) return;
    if (this.authMode() === 'register' && !this.authForm.nome) return;

    this.isSubmittingAuth.set(true);

    if (this.authMode() === 'login') {
      this.authService.loginWithEmail(this.authForm.email, this.authForm.senha).subscribe({
        next: (res) => {
          this.authService.saveAuthData(res);
          this.isSubmittingAuth.set(false);
          this.authForm = { nome: '', email: '', senha: '' }; // reset
        },
        error: (err) => {
          alert('Erro ao fazer login: ' + (err.error?.message || 'Verifique seus dados.'));
          this.isSubmittingAuth.set(false);
        }
      });
    } else {
      this.authService.registerWithEmail(this.authForm.nome, this.authForm.email, this.authForm.senha).subscribe({
        next: (res) => {
          this.authService.saveAuthData(res);
          this.isSubmittingAuth.set(false);
          this.authForm = { nome: '', email: '', senha: '' }; // reset
        },
        error: (err) => {
          alert('Erro ao cadastrar: ' + (err.error?.message || 'Tente novamente.'));
          this.isSubmittingAuth.set(false);
        }
      });
    }
  }

  protected toggleUserMenu() {
    this.isUserMenuOpen.set(!this.isUserMenuOpen());
  }

  protected logout() {
    this.authService.logout();
    this.isUserMenuOpen.set(false);
    this.router.navigate(['/']);
  }
}
