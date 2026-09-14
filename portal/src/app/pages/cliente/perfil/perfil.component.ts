import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-perfil',
  imports: [FormsModule],
  template: `
    <div class="perfil-header">
      <h1>Minha conta</h1>
      <p>Gerencie suas informações e preferências.</p>
    </div>

    <div class="perfil-card">
      <div class="card-header">
        <h2>Informações pessoais</h2>
        <p>Seus dados de acesso e contato.</p>
        @if (isEditingPessoal()) {
          <button class="btn-editar" (click)="salvarPessoal()" style="color: white; background: #2b5cff; border-color: #2b5cff;">
            Salvar
          </button>
        } @else {
          <button class="btn-editar" (click)="isEditingPessoal.set(true)">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Editar
          </button>
        }
      </div>

      <div class="user-main-info">
        @if (authService.currentUser()?.fotoUrl) {
          <img [src]="authService.currentUser()?.fotoUrl" alt="Perfil" class="perfil-avatar-img">
        } @else {
          <div class="perfil-avatar-text">{{ authService.currentUser()?.nome?.charAt(0) || 'U' }}</div>
        }
        <div class="perfil-details">
          @if (isEditingPessoal()) {
            <input type="text" class="edit-input bold-input" [(ngModel)]="editForm.nome" placeholder="Seu nome">
            <input type="email" class="edit-input" [(ngModel)]="editForm.email" placeholder="Seu e-mail">
          } @else {
            <strong>{{ authService.currentUser()?.nome }}</strong>
            <span>{{ authService.currentUser()?.email }}</span>
          }
          <small>Membro desde {{ getMembroDesde() }}</small>
        </div>
      </div>

      <div class="info-list">
        <div class="info-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#888" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <div class="info-item-content">
            <label>Telefone</label>
            @if (isEditingPessoal()) {
              <input type="text" class="edit-input" [(ngModel)]="editForm.telefone" placeholder="(00) 0 0000-0000">
            } @else {
              <span>{{ editForm.telefone || 'Não informado' }}</span>
            }
          </div>
        </div>

        <div class="info-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#888" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div class="info-item-content">
            <label>Cidade</label>
            @if (isEditingPessoal()) {
              <input type="text" class="edit-input" [(ngModel)]="editForm.cidade" placeholder="Ex: Cuiabá/MT">
            } @else {
              <span>{{ editForm.cidade || 'Não informada' }}</span>
            }
          </div>
        </div>
      </div>
    </div>

    <div class="perfil-card">
      <div class="card-header">
        <h2>Segurança</h2>
        <p>Gerencie sua senha de acesso.</p>
      </div>
      
      <div class="info-list" style="margin-top:0;">
        <div class="info-item" style="border:none; padding:15px 0;">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#888" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <div class="info-item-content">
            <label>Senha</label>
            @if (isEditingSenha()) {
              <div class="senha-form">
                <input type="password" class="edit-input" placeholder="Nova senha" [(ngModel)]="senhaForm.novaSenha">
                <button class="btn-editar" (click)="salvarSenha()" style="position:static; margin-left: 10px; color: white; background: #2b5cff; border-color: #2b5cff;">Salvar</button>
                <button class="btn-editar" (click)="isEditingSenha.set(false)" style="position:static;">Cancelar</button>
              </div>
            } @else {
              <span>********</span>
            }
          </div>
          @if (!isEditingSenha()) {
            <button class="btn-alterar" (click)="isEditingSenha.set(true)">Alterar <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          }
        </div>
      </div>
    </div>

    <div class="perfil-card">
      <div class="card-header">
        <h2>Preferências</h2>
        <p>Personalize sua experiência na plataforma.</p>
      </div>

      <div class="info-list" style="margin-top:0;">
        <div class="info-item toggle-item">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#888" stroke-width="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <div class="info-item-content">
            <label>Notificações por e-mail</label>
            <span class="sub">Receba novidades sobre imóveis, lançamentos e oportunidades.</span>
          </div>
          <div class="toggle-switch" [class.active]="prefEmail()" (click)="toggleEmail()"></div>
        </div>

        <div class="info-item toggle-item" style="border:none;">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#888" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <div class="info-item-content">
            <label>Comunicações</label>
            <span class="sub">Receba dicas, conteúdos e novidades do mercado imobiliário.</span>
          </div>
          <div class="toggle-switch" [class.active]="prefComunicacoes()" (click)="toggleComunicacoes()"></div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .perfil-header { margin-bottom: 30px; }
    .perfil-header h1 { font-size: 28px; color: #091b3d; margin-bottom: 5px; font-weight: 700; }
    .perfil-header p { color: #666; font-size: 15px; margin: 0; }
    
    .perfil-card {
      background: white; border: 1px solid #eaeaea; border-radius: 12px;
      padding: 24px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    }
    .card-header { margin-bottom: 20px; position: relative; }
    .card-header h2 { font-size: 18px; color: #091b3d; margin-bottom: 5px; font-weight: 700; }
    .card-header p { color: #888; font-size: 14px; margin: 0; }
    .btn-editar {
      position: absolute; right: 0; top: 0;
      background: white; border: 1px solid #ddd; border-radius: 6px; padding: 6px 12px;
      color: #2b5cff; font-weight: 600; font-size: 13px; cursor: pointer;
      display: flex; align-items: center; gap: 6px; transition: 0.2s;
    }
    .btn-editar:hover { background: #f8fafc; border-color: #2b5cff; }
    
    .user-main-info { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
    .perfil-avatar-img, .perfil-avatar-text {
      width: 70px; height: 70px; border-radius: 50%;
    }
    .perfil-avatar-text {
      background: #f0f4f8; color: #091b3d; display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700;
    }
    .perfil-details { display: flex; flex-direction: column; gap: 4px; }
    .perfil-details strong { font-size: 18px; color: #091b3d; font-weight: 700; }
    .perfil-details span { color: #666; font-size: 14px; }
    .perfil-details small { color: #999; font-size: 12px; }

    .edit-input {
      border: 1px solid #ddd; border-radius: 6px; padding: 8px 12px; font-size: 14px;
      outline: none; transition: 0.2s; font-family: inherit; width: 100%; max-width: 300px;
    }
    .edit-input:focus { border-color: #2b5cff; box-shadow: 0 0 0 3px rgba(43,92,255,0.1); }
    .bold-input { font-weight: 700; color: #091b3d; }
    .senha-form { display: flex; gap: 10px; align-items: center; }

    .info-list { border-top: 1px solid #eaeaea; margin-top: 20px; }
    .info-item { display: flex; align-items: center; gap: 16px; padding: 20px 0; border-bottom: 1px solid #eaeaea; }
    .info-item:last-child { border-bottom: none; padding-bottom: 0; }
    .info-item-content { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .info-item-content label { font-size: 13px; color: #888; }
    .info-item-content span { font-size: 15px; color: #091b3d; font-weight: 600; }
    .info-item-content span.sub { font-size: 13px; color: #666; font-weight: 400; }
    
    .btn-alterar {
      background: white; border: 1px solid #ddd; border-radius: 6px; padding: 6px 12px;
      color: #2b5cff; font-weight: 600; font-size: 13px; cursor: pointer;
      display: flex; align-items: center; gap: 6px; transition: 0.2s;
    }
    .btn-alterar:hover { background: #f8fafc; border-color: #2b5cff; }

    .toggle-switch {
      width: 44px; height: 24px; background: #ccc; border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s;
    }
    .toggle-switch::after {
      content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: 0.3s;
    }
    .toggle-switch.active { background: #2b5cff; }
    .toggle-switch.active::after { left: 22px; }
  `
})
export class PerfilComponent {
  public authService = inject(AuthService);
  private clienteService = inject(ClienteService);

  // States
  protected isEditingPessoal = signal(false);
  protected isEditingSenha = signal(false);
  protected isLoading = signal(true);
  
  protected prefEmail = signal(true);
  protected prefComunicacoes = signal(true);
  protected createdAt = signal<string>('');

  // Form Data
  protected editForm = {
    nome: '',
    email: '',
    telefone: '',
    cidade: ''
  };
  protected senhaForm = {
    novaSenha: ''
  };

  constructor() {
    this.carregarPerfil();
  }

  carregarPerfil() {
    this.clienteService.getPerfil().subscribe({
      next: (perfil) => {
        this.editForm.nome = perfil.nome;
        this.editForm.email = perfil.email;
        this.editForm.telefone = perfil.telefone || '';
        this.editForm.cidade = perfil.cidade || '';
        this.prefEmail.set(perfil.prefEmail);
        this.prefComunicacoes.set(perfil.prefComunicacoes);
        this.createdAt.set(perfil.createdAt || '');
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar perfil', err);
        this.isLoading.set(false);
      }
    });
  }

  getMembroDesde() {
    const data = this.createdAt();
    if (data) {
      const date = new Date(data);
      const mes = date.toLocaleString('pt-BR', { month: 'short' });
      return `${mes}/${date.getFullYear()}`;
    }
    return 'agora';
  }

  salvarPessoal() {
    this.clienteService.updatePerfil(this.editForm).subscribe({
      next: () => {
        this.isEditingPessoal.set(false);
        // Atualiza o local storage auth info pra refletir o nome no Header
        const user = this.authService.currentUser();
        if (user) {
          user.nome = this.editForm.nome;
          this.authService.currentUser.set({ ...user });
        }
      },
      error: (err: any) => alert('Erro ao salvar os dados pessoais')
    });
  }

  salvarSenha() {
    if (!this.senhaForm.novaSenha) return;
    this.clienteService.updateSenha(this.senhaForm.novaSenha).subscribe({
      next: () => {
        this.isEditingSenha.set(false);
        this.senhaForm.novaSenha = '';
        alert('Senha atualizada com sucesso!');
      },
      error: (err: any) => alert('Erro ao atualizar a senha')
    });
  }

  toggleEmail() {
    const novoValor = !this.prefEmail();
    this.prefEmail.set(novoValor);
    this.salvarPreferencias();
  }

  toggleComunicacoes() {
    const novoValor = !this.prefComunicacoes();
    this.prefComunicacoes.set(novoValor);
    this.salvarPreferencias();
  }

  private salvarPreferencias() {
    this.clienteService.updatePreferencias(this.prefEmail(), this.prefComunicacoes()).subscribe({
      error: (err: any) => console.error('Erro ao salvar preferências', err)
    });
  }
}
