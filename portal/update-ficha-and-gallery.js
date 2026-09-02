const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

// 1. New Rich Ficha Técnica Layout matching image media__1786396841804.png
const newFichaHTML = `          <!-- 1.5 Ficha Técnica -->
          @if (activeTab() === 'ficha') {
            <section class="tab-section ficha-section">
              <h2 class="section-title" style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Ficha técnica</h2>
              <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0 0 var(--spacing-lg) 0;">Informações principais sobre o empreendimento.</p>

              <!-- Main Card Container -->
              <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-xl); background-color: white; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: var(--spacing-xl);">
                
                <!-- ROW 1: Main Stats (6 Columns with icons top) -->
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--spacing-md); text-align: center; border-bottom: 1px solid #f1f1f1; padding-bottom: var(--spacing-xl);">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ areaTerreno() }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Área do terreno</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; border-left: 1px solid #eaeaea;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9" y2="6"></line><line x1="15" y1="6" x2="15" y2="6"></line><line x1="9" y1="10" x2="9" y2="10"></line><line x1="15" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="9" y2="14"></line><line x1="15" y1="14" x2="15" y2="14"></line><line x1="9" y1="18" x2="9" y2="18"></line><line x1="15" y1="18" x2="15" y2="18"></line></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.qtdeTorre || 1 }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Torres</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; border-left: 1px solid #eaeaea;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ qtdeUnidades() }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Unidades</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; border-left: 1px solid #eaeaea;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ metragens() }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Metragens</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; border-left: 1px solid #eaeaea;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ dormitorios() }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Suítes</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; border-left: 1px solid #eaeaea;">
                    <span style="color: var(--text-primary);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="2" y="10" width="20" height="10" rx="2" ry="2"></rect><circle cx="6" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle><path d="M4 10l2-6h12l2 6"></path></svg></span>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ vagas() }}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">Vagas</span>
                  </div>
                </div>

                <!-- ROW 2: Detailed Specs with Icons -->
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--spacing-md); border-bottom: 1px solid #f1f1f1; padding-bottom: var(--spacing-xl);">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Tipologia</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">Apartamentos</h5>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Número de pavimentos</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">24</h5>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="9" width="2" height="2"></rect><rect x="9" y="13" width="2" height="2"></rect><rect x="13" y="13" width="2" height="2"></rect></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Total de unidades por andar</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">2 a 4</h5>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="6" x2="12" y2="10"></line><line x1="12" y1="14" x2="12" y2="18"></line></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Elevadores</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">2</h5>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Área de lazer</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">Completa</h5>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--text-secondary);"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6h2a2 2 0 0 1 2 2v9.5"></path><path d="M5.5 17.5l4-8.5h4l2.5 4.5"></path></svg></span>
                    <div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); display: block;">Bicicletário</span>
                      <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0;">Sim</h5>
                    </div>
                  </div>
                </div>

                <!-- ROW 3: Summary (Tipo, Status, Previsão) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-lg);">
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Tipo de empreendimento</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.tipo || 'Horizontal' }}</h4>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Status</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.status || 'Liberada' }}</h4>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Previsão de entrega</span>
                    <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.previsaoEntrega || '—' }}</h4>
                  </div>
                </div>

              </div>

              <!-- HIGHLIGHT CARDS BELOW FICHA TÉCNICA -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-md); margin-top: var(--spacing-lg);">
                <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-md); background: white; display: flex; align-items: flex-start; gap: 12px; box-shadow: var(--shadow-sm);">
                  <span style="color: var(--text-primary); margin-top: 2px;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>
                  <div>
                    <h5 style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Condomínio fechado</h5>
                    <span style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3; display: block;">Segurança e privacidade para sua família</span>
                  </div>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-md); background: white; display: flex; align-items: flex-start; gap: 12px; box-shadow: var(--shadow-sm);">
                  <span style="color: var(--text-primary); margin-top: 2px;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg></span>
                  <div>
                    <h5 style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Sustentabilidade</h5>
                    <span style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3; display: block;">Áreas verdes preservadas e soluções sustentáveis</span>
                  </div>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-md); background: white; display: flex; align-items: flex-start; gap: 12px; box-shadow: var(--shadow-sm);">
                  <span style="color: var(--text-primary); margin-top: 2px;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></span>
                  <div>
                    <h5 style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Alto padrão</h5>
                    <span style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3; display: block;">Acabamentos de alto padrão e infraestrutura completa</span>
                  </div>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-md); background: white; display: flex; align-items: flex-start; gap: 12px; box-shadow: var(--shadow-sm);">
                  <span style="color: var(--text-primary); margin-top: 2px;"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                  <div>
                    <h5 style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Localização privilegiada</h5>
                    <span style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3; display: block;">A 2 min da Av. Miguel Sutil e 5 min do Pantanal Shopping</span>
                  </div>
                </div>
              </div>
            </section>
          }`;

// Replace old ficha section
html = html.replace(/<!-- 1\.5 Ficha Técnica -->[\s\S]*?<\/section>\s*\}/, newFichaHTML);

// 2. Add Galeria de Fotos ("Mais imagens do empreendimento") as an ALWAYS-VISIBLE section below Localização
const photoGallerySection = `
        <!-- 6. Galeria de Imagens Categorizada (Sempre Visível) -->
        @if (categorizedPhotos().length > 0) {
          <section id="section-fotos" class="photo-gallery-section" style="margin-top: var(--spacing-xl); padding-top: var(--spacing-xl); border-top: 1px solid var(--border-color);">
            <h2 class="section-title" style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">Mais imagens do empreendimento</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0 0 var(--spacing-lg) 0;">Explore a galeria completa de fotos por categoria:</p>

            <!-- Category Filter Buttons -->
            <div class="photo-filter-tabs" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg);">
              <button
                (click)="setPhotoFilter('Todas as Fotos')"
                [style.background-color]="activePhotoFilter() === 'Todas as Fotos' ? '#0055ff' : '#f8f9fa'"
                [style.color]="activePhotoFilter() === 'Todas as Fotos' ? 'white' : 'var(--text-primary)'"
                [style.border]="activePhotoFilter() === 'Todas as Fotos' ? '1px solid #0055ff' : '1px solid var(--border-color)'"
                style="padding: 8px 18px; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
                Todas as Fotos
              </button>
              @for (tipo of availablePhotoTypes(); track tipo) {
                <button
                  (click)="setPhotoFilter(tipo)"
                  [style.background-color]="activePhotoFilter() === tipo ? '#0055ff' : '#f8f9fa'"
                  [style.color]="activePhotoFilter() === tipo ? 'white' : 'var(--text-primary)'"
                  [style.border]="activePhotoFilter() === tipo ? '1px solid #0055ff' : '1px solid var(--border-color)'"
                  style="padding: 8px 18px; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
                  {{ tipo }}
                </button>
              }
            </div>

            <!-- Photo Grid (Masonry-style) -->
            <div class="photo-masonry-grid" style="columns: 3; column-gap: 12px;">
              @for (photo of filteredPhotos(); track photo.url; let i = $index) {
                <div style="break-inside: avoid; margin-bottom: 12px; cursor: pointer; overflow: hidden; border-radius: var(--radius-md); position: relative; background-color: var(--surface-color); border: 1px solid var(--border-color);"
                     (click)="openLightbox(i)">
                  <img [src]="photo.url" [alt]="photo.tipo"
                       style="width: 100%; height: auto; display: block; object-fit: cover; transition: transform 0.3s ease;"
                       loading="lazy"
                       (mouseover)="$event.target['style'].transform = 'scale(1.04)'"
                       (mouseleave)="$event.target['style'].transform = 'scale(1)'" />
                </div>
              }
            </div>
          </section>
        }
`;

// Insert the photo gallery section right after section-localizacao
if (!html.includes('id="section-fotos"')) {
  html = html.replace(/(<\/section>\s*<\/div>\s*<\/div>\s*<!-- Right Column)/, `</section>\n${photoGallerySection}\n        </div>\n      </div>\n      <!-- Right Column`);
}

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html, 'utf8');
console.log('Ficha Técnica layout & Galeria de Fotos restored!');
