import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cliente-layout',
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="cliente-layout-container">
      <aside class="cliente-sidebar">
        <div class="sidebar-menu">
          <a routerLink="/cliente" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-link">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Minha conta</span>
          </a>
          
          <a routerLink="/cliente/favoritos" routerLinkActive="active" class="sidebar-link">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>Favoritos</span>
          </a>
        </div>
        
        <div class="sidebar-footer">
          <button class="sidebar-link text-danger" (click)="logout()">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Sair</span>
          </button>
        </div>
      </aside>
      
      <main class="cliente-main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    .cliente-layout-container {
      display: flex;
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
      gap: 40px;
      min-height: 60vh;
    }
    .cliente-sidebar {
      width: 250px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .sidebar-menu { display: flex; flex-direction: column; gap: 8px; }
    .sidebar-link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 8px;
      color: #555; text-decoration: none; font-weight: 500;
      transition: all 0.2s; border: none; background: none; width: 100%; cursor: pointer; text-align: left;
    }
    .sidebar-link:hover { background: #f8fafc; color: #091b3d; }
    .sidebar-link.active { background: #eef5fc; color: #2b5cff; font-weight: 600; }
    
    .sidebar-link.text-danger { color: #e74c3c; margin-top: 20px; }
    .sidebar-link.text-danger:hover { background: #fceceb; }
    
    .cliente-main-content {
      flex: 1;
      min-width: 0;
    }
    
    @media (max-width: 768px) {
      .cliente-layout-container { flex-direction: column; gap: 20px; }
      .cliente-sidebar { width: 100%; }
      .sidebar-menu { flex-direction: row; flex-wrap: wrap; }
      .sidebar-link { width: auto; }
    }
  `
})
export class ClienteLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
