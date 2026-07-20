import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LunaService } from './core/services/luna.service';

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

  // Luna Chat signals
  protected showChat = signal(false);
  protected chatMessages = signal<Array<{ sender: 'user' | 'luna', text: string }>>([]);
  protected currentChatMessage = '';

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
}
