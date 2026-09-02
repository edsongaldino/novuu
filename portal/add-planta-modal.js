const fs = require('fs');

// 1. Update detalhe.component.ts
let ts = fs.readFileSync('src/app/pages/detalhe/detalhe.component.ts', 'utf8');

const tsStateMethods = `
  protected selectedPlantaModal = signal<any | null>(null);
  protected selectedPlantaImageIndex = signal<number>(0);

  protected openPlantaModal(planta: any) {
    const allPlantas = this.plantasDaDatabase();
    const images = allPlantas.map(p => p.imagemUrl).filter(Boolean);
    const index = allPlantas.findIndex(p => p.imagemUrl === planta.imagemUrl);
    
    this.selectedPlantaModal.set({
      ...planta,
      images: images.length > 0 ? images : [planta.imagemUrl],
      cleanNome: this.cleanPlantaTitle(planta.nome)
    });
    this.selectedPlantaImageIndex.set(index >= 0 ? index : 0);
  }

  protected closePlantaModal() {
    this.selectedPlantaModal.set(null);
  }

  protected cleanPlantaTitle(nome: string): string {
    if (!nome) return 'Planta';
    let clean = nome.replace(/INSERT INTO[\\s\\S]*/gi, '').trim();
    return clean || 'Planta';
  }
`;

if (!ts.includes('selectedPlantaModal')) {
  ts = ts.replace(/protected getPlantaLabel/, `${tsStateMethods}\n  protected getPlantaLabel`);
  fs.writeFileSync('src/app/pages/detalhe/detalhe.component.ts', ts, 'utf8');
}

// 2. Update detalhe.component.html
let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

// Update floorplan card clicks to openPlantaModal(planta)
html = html.replace(/\(click\)="openLightboxForGallery\(getActivePhotoIndex\(planta\.imagemUrl\)\)"/g, '(click)="openPlantaModal(planta)"');
html = html.replace(/\{\{\s*planta\.nome\s*\}\}/g, '{{ cleanPlantaTitle(planta.nome) }}');

// Planta Modal HTML
const modalHTML = `
    <!-- PLANTA DETAILS MODAL -->
    @if (selectedPlantaModal()) {
      <div class="modal-overlay" (click)="closePlantaModal()" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div class="modal-card" (click)="$event.stopPropagation()" style="background: white; border-radius: 16px; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; padding: 24px;">
          
          <!-- Modal Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f1f1f1; padding-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 42px; height: 42px; border-radius: 10px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>
              </div>
              <div>
                <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 0;">{{ selectedPlantaModal()?.cleanNome }}</h3>
                <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">APARTAMENTO</span>
              </div>
            </div>
            <button (click)="closePlantaModal()" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">✕</button>
          </div>

          <!-- Modal Body (2 Columns) -->
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px;">
            
            <!-- Left Column: Floorplan Image & Slider -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="width: 100%; height: 320px; border-radius: 12px; border: 1px solid #f1f5f9; background: #fafafa; display: flex; align-items: center; justify-content: center; padding: 12px; overflow: hidden;">
                <img [src]="selectedPlantaModal()?.images[selectedPlantaImageIndex()]" [alt]="selectedPlantaModal()?.cleanNome" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>

              <!-- Thumbnails & Controls -->
              @if (selectedPlantaModal()?.images?.length > 1) {
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                  <button (click)="selectedPlantaImageIndex.set((selectedPlantaImageIndex() - 1 + selectedPlantaModal().images.length) % selectedPlantaModal().images.length)" style="background: none; border: none; cursor: pointer; color: #64748b; font-size: 1.2rem;">‹</button>
                  <span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">{{ selectedPlantaImageIndex() + 1 }} / {{ selectedPlantaModal()?.images?.length }}</span>
                  <button (click)="selectedPlantaImageIndex.set((selectedPlantaImageIndex() + 1) % selectedPlantaModal().images.length)" style="background: none; border: none; cursor: pointer; color: #64748b; font-size: 1.2rem;">›</button>
                </div>

                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
                  @for (img of selectedPlantaModal()?.images; track img; let i = $index) {
                    <button (click)="selectedPlantaImageIndex.set(i)" style="width: 60px; height: 60px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; padding: 0; cursor: pointer; background: #fafafa; flex-shrink: 0;" [style.border-color]="selectedPlantaImageIndex() === i ? '#0055ff' : 'transparent'">
                      <img [src]="img" style="width: 100%; height: 100%; object-fit: cover;" />
                    </button>
                  }
                </div>
              }
            </div>

            <!-- Right Column: Planta Specs -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Informações da planta</h4>
                
                <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem;">
                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">📐 Área privativa</span>
                    <strong style="color: #0f172a;">{{ selectedPlantaModal()?.area || '96,97' }} m²</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🛏️ Dormitórios</span>
                    <strong style="color: #0f172a;">{{ selectedPlantaModal()?.quartos || 3 }}</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🛏️ Suítes</span>
                    <strong style="color: #0f172a;">{{ selectedPlantaModal()?.suites || 1 }}</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🚿 Banheiros</span>
                    <strong style="color: #0f172a;">{{ selectedPlantaModal()?.banheiros || 2 }}</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🚗 Vagas de garagem</span>
                    <strong style="color: #0f172a;">{{ selectedPlantaModal()?.vagas || 2 }}</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🧭 Posição</span>
                    <strong style="color: #0f172a;">Frente</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🏢 Tipo</span>
                    <strong style="color: #0f172a;">Apartamento</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🏢 Andar</span>
                    <strong style="color: #0f172a;">1º ao 8º pavimento</strong>
                  </div>

                  <div style="display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; display: flex; align-items: center; gap: 6px;">🔢 Final</span>
                    <strong style="color: #0f172a;">1, 2, 3 e 4</strong>
                  </div>
                </div>
              </div>

              <!-- Diferenciais -->
              <div>
                <h5 style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">Diferenciais</h5>
                <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.82rem; color: #475569;">
                  <span>✓ Varanda gourmet integrada à sala</span>
                  <span>✓ Suíte master com espaço para closet</span>
                  <span>✓ Cozinha integrada com área de serviço</span>
                  <span>✓ Lavabo</span>
                  <span>✓ Excelente iluminação e ventilação natural</span>
                </div>
              </div>

              <!-- PDF Download Button -->
              <button style="background: #0b2545; color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Baixar planta em PDF
              </button>

            </div>

          </div>

        </div>
      </div>
    }
`;

if (!html.includes('selectedPlantaModal')) {
  html = html.replace('<!-- Lightbox Overlay -->', `${modalHTML}\n\n    <!-- Lightbox Overlay -->`);
  fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html, 'utf8');
}

console.log('Planta Modal successfully added and titles cleaned!');
