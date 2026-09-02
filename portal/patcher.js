const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

// The original file is at HEAD (which means it has NO SVGs and it has the old layout).
// Let's modify the tabs first to include SVGs and include the Unidades tab (which is already there!).
html = html.replace(/<nav class=\"detail-tabs\"[^>]*>[\s\S]*?<\/nav>/, `<nav class="detail-tabs" style="margin-bottom: var(--spacing-lg); border-bottom: 2px solid var(--border-color); display: flex; gap: var(--spacing-lg); overflow-x: auto; padding-bottom: 2px;">
      <button [class.active]="activeTab() === 'sobre'" (click)="setTab('sobre')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Visão geral
      </button>
      <button [class.active]="activeTab() === 'unidades'" (click)="setTab('unidades')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        Unidades
      </button>
      <button [class.active]="activeTab() === 'diferenciais'" (click)="setTab('diferenciais')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        Diferenciais
      </button>
      <button [class.active]="activeTab() === 'plantas'" (click)="setTab('plantas')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        Plantas
      </button>
      <button [class.active]="activeTab() === 'localizacao'" (click)="setTab('localizacao')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Localização
      </button>
      <button [class.active]="activeTab() === 'construtora'" (click)="setTab('construtora')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><path d="M12 2l9 4v12l-9 4-9-4V6l9-4z"></path></svg>
        Construtora
      </button>
    </nav>`);

// Now let's extract the "Unidades" block from the original HTML before we overwrite the layout
const unidadesMatch = html.match(/(@if \(activeTab\(\) === 'unidades'\) \{[\s\S]*?<\/section>\s*\})/);
const unidadesHTML = unidadesMatch ? unidadesMatch[1] : '';

// Now let's read the NEW layout code from extracted.html
let extracted = fs.readFileSync('extracted.html', 'utf8');

// Wrap the new layout sections in their respective activeTab() blocks
// 1. Sobre (Visão geral) will contain "Sobre o empreendimento", "Diferenciais", "Ficha técnica", "Plantas"
let sobreHTML = extracted.match(/<section id="section-sobre"[^>]*>[\s\S]*?<\/section>/)[0] + '\n\n' +
                extracted.match(/<section id="section-diferenciais"[^>]*>[\s\S]*?<\/section>/)[0] + '\n\n' +
                extracted.match(/<section class="tab-section ficha-horizontal-section"[^>]*>[\s\S]*?<\/section>/)[0] + '\n\n' +
                (extracted.match(/<section id="section-plantas"[^>]*>[\s\S]*?<\/section>/)?.[0] || '');

// Localizacao
let localizacaoHTML = extracted.match(/<section id="section-localizacao"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';

// Construtora
let construtoraHTML = extracted.match(/<section id="section-construtora"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';

// Right Sidebar
let rightSidebarHTML = extracted.match(/<aside class="detail-right-column"[^>]*>[\s\S]*?<\/aside>/)[0];

// The layout grid
const newLayout = `<div class="detail-layout-grid" style="display: grid; grid-template-columns: 2.3fr 1fr; gap: var(--spacing-xxl);">
      <div class="detail-left-column" style="margin: 0; padding: 0;">
        <div class="tab-content-container" style="background-color: transparent; border: none; padding: 0; box-shadow: none;">
          @if (activeTab() === 'sobre') {
            \${sobreHTML}
          }
          
          \${unidadesHTML}

          @if (activeTab() === 'diferenciais') {
            \${extracted.match(/<section id="section-diferenciais"[^>]*>[\\s\\S]*?<\\/section>/)[0]}
          }

          @if (activeTab() === 'plantas') {
            \${extracted.match(/<section id="section-plantas"[^>]*>[\\s\\S]*?<\\/section>/)?.[0] || ''}
          }

          @if (activeTab() === 'localizacao') {
            \${localizacaoHTML}
          }

          @if (activeTab() === 'construtora') {
            \${construtoraHTML}
          }
        </div>
      </div>
      \${rightSidebarHTML}
    </div>`;

html = html.replace(/<div class="detail-layout-grid"[\s\S]*?<\/div>\s*<\/div>\s*<!-- Lightbox/m, newLayout + '\n\n    <!-- Lightbox');

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
console.log('Successfully patched!');
