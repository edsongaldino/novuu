const fs = require('fs');

// 1. Update detalhe.component.ts
let ts = fs.readFileSync('src/app/pages/detalhe/detalhe.component.ts', 'utf8');

const oldSetTab = `  protected setTab(tab: 'sobre' | 'ficha' | 'unidades' | 'plantas' | 'diferenciais' | 'localizacao' | 'construtora') {
    this.activeTab.set(tab);
  }`;

const newSetTab = `  protected setTab(tab: 'sobre' | 'ficha' | 'unidades' | 'plantas' | 'diferenciais' | 'localizacao' | 'construtora') {
    if (tab === 'plantas' || tab === 'localizacao') {
      const element = document.getElementById(\`section-\${tab}\`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    this.activeTab.set(tab);
  }`;

ts = ts.replace(oldSetTab, newSetTab);
fs.writeFileSync('src/app/pages/detalhe/detalhe.component.ts', ts);

// 2. Update detalhe.component.html
let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

// Extract Plantas section
const plantasMatch = html.match(/<!-- 4\. Plantas -->\s*@if \(activeTab\(\) === 'plantas'\) \{\s*<section class="tab-section plans-section">([\s\S]*?)<\/section>\s*\}/);

// Extract Localização section
const localizacaoMatch = html.match(/<!-- 5\. Localização -->\s*@if \(activeTab\(\) === 'localizacao'\) \{\s*<section class="tab-section location-section">([\s\S]*?)<\/section>\s*\}/);

if (plantasMatch && localizacaoMatch) {
  const plantasContent = plantasMatch[1];
  const localizacaoContent = localizacaoMatch[1];

  // Remove both @if blocks from tab-content-container
  html = html.replace(/<!-- 4\. Plantas -->\s*@if \(activeTab\(\) === 'plantas'\) \{\s*<section class="tab-section plans-section">[\s\S]*?<\/section>\s*\}/, '');
  html = html.replace(/<!-- 5\. Localização -->\s*@if \(activeTab\(\) === 'localizacao'\) \{\s*<section class="tab-section location-section">[\s\S]*?<\/section>\s*\}/, '');

  // Construct always-visible sections
  const alwaysVisibleSections = `
        <!-- 4. Plantas (Sempre Visível) -->
        <section id="section-plantas" class="tab-section plans-section" style="margin-top: var(--spacing-xl); padding-top: var(--spacing-xl); border-top: 1px solid var(--border-color);">
          ${plantasContent.trim()}
        </section>

        <!-- 5. Localização (Sempre Visível) -->
        <section id="section-localizacao" class="tab-section location-section" style="margin-top: var(--spacing-xl); padding-top: var(--spacing-xl); border-top: 1px solid var(--border-color);">
          ${localizacaoContent.trim()}
        </section>
`;

  // Append after tab-content-container closes (</div> before </aside>)
  html = html.replace(/(\s*<\/div>\s*<\/div>\s*<!-- Right Column)/, `${alwaysVisibleSections}\n$1`);

  fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
  console.log('Plantas e Localizacao agora estao sempre visiveis!');
} else {
  console.error('Nao foi possivel encontrar as secoes Plantas e Localizacao');
}
