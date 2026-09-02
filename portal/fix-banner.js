const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

// 1. Fix hero-top-left badge overlap and position chip below address
const oldTopLeft = `<div class="hero-top-left" style="position: absolute; top: var(--spacing-xl); left: 0; color: white; pointer-events: auto; display: flex; flex-direction: column; align-items: flex-start;">
        <nav class="breadcrumbs" style="color: rgba(255,255,255,0.7); margin-bottom: var(--spacing-sm);">
          <a routerLink="/" style="color: white; text-decoration: none;">Home</a>
          <span class="separator" style="color: rgba(255,255,255,0.5); margin: 0 8px;">/</span>
          <a routerLink="/busca" style="color: white; text-decoration: none;">Empreendimentos</a>
          <span class="separator" style="color: rgba(255,255,255,0.5); margin: 0 8px;">/</span>
          <span class="current" style="color: rgba(255,255,255,0.9);">{{ empreendimento()?.nome }}</span>
        </nav>
        
        <h1 class="detail-title" style="font-size: 2.8rem; font-weight: 800; color: white; margin: 0 0 var(--spacing-xs) 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          {{ empreendimento()?.nome }}
        </h1>
        
        <p class="detail-address" style="font-size: 1rem; color: rgba(255,255,255,0.9); margin: 0 0 var(--spacing-md) 0; display: flex; align-items: center; gap: 6px;">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>{{ address() }}</span>
        </p>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span class="badge status-badge" style="display: inline-block; background-color: var(--secondary-color); color: white; padding: 6px 14px; font-weight: 700; border-radius: var(--radius-sm); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; box-shadow: 0 2px 5px rgba(0,0,0,0.2); width: fit-content;">
            {{ empreendimento()?.status || 'Lançamento' }}
          </span>
          @if (empreendimento()?.construtora?.nomeAbreviado) {
            <span class="badge" style="display: inline-block; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.8rem; color: white; border-left: 3px solid var(--secondary-color); border-top: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); text-transform: uppercase; letter-spacing: 0.05em; width: fit-content;">
              {{ empreendimento()?.construtora?.nomeAbreviado }}
            </span>
          }
        </div>
      </div>`;

const newTopLeft = `<div class="hero-top-left" style="position: absolute; top: var(--spacing-xl); left: 0; color: white; pointer-events: auto; display: flex; flex-direction: column; align-items: flex-start; gap: 4px;">
        <nav class="breadcrumbs" style="color: rgba(255,255,255,0.7); margin-bottom: var(--spacing-xs);">
          <a routerLink="/" style="color: white; text-decoration: none;">Home</a>
          <span class="separator" style="color: rgba(255,255,255,0.5); margin: 0 8px;">/</span>
          <a routerLink="/busca" style="color: white; text-decoration: none;">Empreendimentos</a>
          <span class="separator" style="color: rgba(255,255,255,0.5); margin: 0 8px;">/</span>
          <span class="current" style="color: rgba(255,255,255,0.9);">{{ empreendimento()?.nome }}</span>
        </nav>
        
        <h1 class="detail-title" style="font-size: 2.8rem; font-weight: 800; color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.1;">
          {{ empreendimento()?.nome }}
        </h1>
        
        <p class="detail-address" style="font-size: 1rem; color: rgba(255,255,255,0.9); margin: 6px 0 0 0; display: flex; align-items: center; gap: 6px;">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>{{ address() }}</span>
        </p>

        <!-- Construtora chip & status badge below address -->
        <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
          @if (empreendimento()?.construtora?.nomeAbreviado) {
            <span style="display: inline-flex; align-items: center; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 6px 14px; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.8rem; color: #ffffff; border-left: 3px solid #0055ff; border-top: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); text-transform: uppercase; letter-spacing: 0.05em;">
              {{ empreendimento()?.construtora?.nomeAbreviado }}
            </span>
          }
          <span style="display: inline-flex; align-items: center; background-color: #0055ff; color: #ffffff; padding: 6px 14px; font-weight: 700; border-radius: var(--radius-sm); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            {{ empreendimento()?.status || 'Lançamento' }}
          </span>
        </div>
      </div>`;

html = html.replace(oldTopLeft, newTopLeft);

// 2. Vertically center hero-floating-sidebar
html = html.replace(
  'class="hero-floating-sidebar" style="position: absolute; top: var(--spacing-xl); right: 0;',
  'class="hero-floating-sidebar" style="position: absolute; top: 50%; transform: translateY(-50%); right: 0;'
);

// 3. Fix button color for "Quero mais informações"
const oldBtn = `<button (click)="scrollToForm()" class="submit-contact-btn hero-main-btn" style="background-color: var(--secondary-color); color: white; width: 100%; border: none; padding: 14px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; font-size: 1rem; text-align: center; transition: all 0.2s ease;">
            Quero mais informações
          </button>`;

const newBtn = `<button (click)="scrollToForm()" class="hero-main-btn" style="background-color: #0055ff; color: #ffffff; width: 100%; border: none; padding: 14px; border-radius: var(--radius-md); font-weight: 800; cursor: pointer; font-size: 1.05rem; text-align: center; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(0, 85, 255, 0.4);" onmouseover="this.style.backgroundColor='#0044cc'" onmouseout="this.style.backgroundColor='#0055ff'">
            Quero mais informações
          </button>`;

html = html.replace(oldBtn, newBtn);

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
console.log("Banner adjustments applied successfully!");
