const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

const regex = /(<!-- Ficha Técnica Horizontal -->[\s\S]*?)(\s*<\/section>\s*\}\s*<!-- 2\. Unidades -->)/;
const match = html.match(regex);
if (!match) {
    console.log("Could not find Ficha Técnica Horizontal block");
    process.exit(1);
}

let fichaContent = match[1];

// Remove it from current location
html = html.replace(fichaContent, '');

// Create the new tab section for Ficha Técnica
const newTabSection = `
          <!-- 1.5 Ficha Técnica -->
          @if (activeTab() === 'ficha') {
            <section class="tab-section ficha-section">
              ${fichaContent.trim()}
            </section>
          }
`;

// Insert the new tab section right after the 'sobre' section closes
html = html.replace(/(\s*<\/section>\s*\})/, `$1\n${newTabSection}`);

// Add the button to the nav
const navButton = `
      <button [class.active]="activeTab() === 'ficha'" (click)="setTab('ficha')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Ficha Técnica
      </button>`;

html = html.replace(/(Visão geral\s*<\/button>)/, `$1\n${navButton}`);

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
console.log("Ficha Técnica moved to its own tab!");
