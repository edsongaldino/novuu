const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

const horizontalFicha = `
              <!-- Ficha Técnica Horizontal -->
              <h3 class="section-subtitle" style="margin-top: var(--spacing-xxl);">Ficha técnica</h3>
              <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-lg); background-color: white;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--spacing-sm); border-bottom: 1px solid var(--border-color); padding-bottom: var(--spacing-lg); margin-bottom: var(--spacing-md); flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 140px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ areaTerreno() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Área do terreno</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9" y2="6"></line><line x1="15" y1="6" x2="15" y2="6"></line><line x1="9" y1="10" x2="9" y2="10"></line><line x1="15" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="9" y2="14"></line><line x1="15" y1="14" x2="15" y2="14"></line><line x1="9" y1="18" x2="9" y2="18"></line><line x1="15" y1="18" x2="15" y2="18"></line></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.qtdeTorre || 1 }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Torres</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ qtdeUnidades() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Unidades</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1.2; min-width: 160px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ metragens() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Metragens</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ dormitorios() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Suítes</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="2" y="10" width="20" height="10" rx="2" ry="2"></rect><circle cx="6" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle><path d="M4 10l2-6h12l2 6"></path></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ vagas() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Vagas</span>
                    </div>
                  </div>
                </div>
  
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-lg);">
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Tipo de empreendimento</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.tipo }}</h4>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Status</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.status }}</h4>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Previsão de entrega</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.previsaoEntrega }}</h4>
                  </div>
                </div>
              </div>
`;

// 1. Inject horizontal Ficha Técnica into the "sobre" tab.
// Find the end of the `sobre` tab section, which is `</section>` just before `}` 
// Actually, let's inject it right after the amenities-summary-grid block ends.
html = html.replace(/<div class="amenities-summary-grid">[\s\S]*?<\/div>/, match => match + '\n' + horizontalFicha);

// 2. Remove the vertical Ficha Técnica from the right sidebar.
html = html.replace(/<!-- Technical Specs Card \(Vertical\) -->[\s\S]*?<\/aside>/, '</aside>');

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
console.log("Ficha tecnica moved");
