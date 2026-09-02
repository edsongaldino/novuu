const fs = require('fs');

const fullHTML = `@if (loading()) {
  <div class="detail-loader">
    <div class="spinner"></div>
    <p>Carregando detalhes do empreendimento...</p>
  </div>
} @else if (error()) {
  <div class="detail-error-container">
    <svg viewBox="0 0 24 24" width="64" height="64" stroke="#ff4f4f" stroke-width="1.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <h2>Ops!</h2>
    <p>{{ error() }}</p>
    <a routerLink="/busca" class="back-to-list-btn">Voltar para a busca</a>
  </div>
} @else {
  <!-- HERO SECTION (Full Viewport Width Layout) -->
  <div class="detail-hero-section" style="position: relative; width: 100%; height: 650px; overflow: hidden; margin-bottom: var(--spacing-xl); box-shadow: var(--shadow-md);">
    
    <!-- Background Image -->
    <img [src]="galleryImages()[activeImageIndex()]" [alt]="empreendimento()?.nome" 
         style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);" 
         (click)="openLightboxForGallery(activeImageIndex())"
         (mouseover)="$event.target['style'].transform = 'scale(1.02)'"
         (mouseleave)="$event.target['style'].transform = 'scale(1)'" />
         
    <!-- Gradient Overlays for Readability -->
    <div class="hero-overlay-top" style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 30%); pointer-events: none; z-index: 5;"></div>
    <div class="hero-overlay-bottom" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%); pointer-events: none; z-index: 5;"></div>
    
    <!-- Hero Inner Container -->
    <div class="hero-inner-container" style="position: absolute; inset: 0; max-width: 1600px; width: 90%; margin: 0 auto; pointer-events: none; z-index: 10;">

      <!-- TOP LEFT: Header Info (Breadcrumbs, Title, Address, Badges) -->
      <div class="hero-top-left" style="position: absolute; top: var(--spacing-xl); left: 0; color: white; pointer-events: auto; display: flex; flex-direction: column; align-items: flex-start;">
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

        <!-- Chips & Status below address -->
        <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
          @if (empreendimento()?.construtora?.nomeAbreviado) {
            <span style="display: inline-flex; align-items: center; background-color: rgba(0,0,0,0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 6px 14px; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.8rem; color: #ffffff; border-left: 3px solid #0055ff; border-top: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); text-transform: uppercase; letter-spacing: 0.05em;">
              {{ empreendimento()?.construtora?.nomeAbreviado }}
            </span>
          }
          <span style="display: inline-flex; align-items: center; background-color: #0055ff; color: #ffffff; padding: 6px 14px; font-weight: 700; border-radius: var(--radius-sm); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            {{ empreendimento()?.status || 'Lançamento' }}
          </span>
        </div>
      </div>

      <!-- RIGHT CENTER: Floating Action Sidebar Card (Vertically Centered) -->
      <div class="hero-floating-sidebar" style="position: absolute; top: 50%; transform: translateY(-50%); right: 0; background-color: rgba(30, 30, 30, 0.45); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); color: white; border-radius: var(--radius-lg); padding: var(--spacing-xl); width: 360px; box-shadow: 0 10px 40px rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: var(--spacing-md); border: 1px solid rgba(255,255,255,0.08); pointer-events: auto;">
        
        <div class="action-price-box">
          <span class="price-lbl" style="font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">A partir de</span>
          @if (empreendimento()?.valorInicial && empreendimento()?.valorInicial > 0) {
            <h2 class="price-val" style="color: white; font-size: 2.2rem; font-weight: 800; margin: 0 0 8px 0; line-height: 1.1; font-family: 'Outfit', sans-serif;">
              {{ empreendimento()?.valorInicial | currency:'BRL':'symbol':'1.0-0' }}
            </h2>
          } @else {
            <h2 class="price-val" style="color: white; font-size: 2rem; font-weight: 800; margin: 0 0 8px 0; line-height: 1.1; font-family: 'Outfit', sans-serif;">
              Sob consulta
            </h2>
          }
          <p class="action-location-desc" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0 0 6px 0; display: flex; align-items: center; gap: 6px;">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{{ address() }}</span>
          </p>
        </div>

        <!-- Quick Specs List -->
        <div class="action-quick-specs" style="display: flex; flex-direction: column; gap: 14px; padding: var(--spacing-md) 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div class="quick-spec-item" style="display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: rgba(255,255,255,0.9); font-weight: 500;">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" style="color: rgba(255,255,255,0.5);"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>{{ metragens() }}</span>
          </div>
          <div class="quick-spec-item" style="display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: rgba(255,255,255,0.9); font-weight: 500;">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" style="color: rgba(255,255,255,0.5);"><path d="M3 11V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"></path><path d="M12 5v14"></path><path d="M3 18v-7h18v7"></path></svg>
            <span>{{ dormitorios() }}</span>
          </div>
          <div class="quick-spec-item" style="display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: rgba(255,255,255,0.9); font-weight: 500;">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" style="color: rgba(255,255,255,0.5);"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <span>{{ vagas() }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          <button (click)="scrollToForm()" class="hero-main-btn" style="background-color: #0055ff; color: #ffffff; width: 100%; border: none; padding: 14px; border-radius: var(--radius-md); font-weight: 800; cursor: pointer; font-size: 1.05rem; text-align: center; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(0, 85, 255, 0.4);" onmouseover="this.style.backgroundColor='#0044cc'" onmouseout="this.style.backgroundColor='#0055ff'">
            Quero mais informações
          </button>
          
          <div class="action-btns-row" style="display: flex; gap: var(--spacing-sm);">
            <button class="action-btn share" (click)="shareLink()" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.03); padding: 10px; border-radius: var(--radius-md); cursor: pointer; color: white; font-weight: 600; font-size: 0.9rem; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='rgba(255,255,255,0.03)'">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Compartilhar</span>
            </button>
            <button class="action-btn favorite" style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: var(--radius-md); cursor: pointer; color: white; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='rgba(255,255,255,0.03)'">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- BOTTOM LEFT: Thumbnails with glassmorphism -->
      <div class="hero-thumbnails-container" style="position: absolute; bottom: var(--spacing-xl); left: 0; display: flex; flex-direction: column; gap: 12px; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 12px; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.1); max-width: calc(100% - 420px); pointer-events: auto;">
        
        <div class="gallery-thumbnails" style="display: flex; gap: 8px;">
          @for (img of visibleThumbs(); track img; let i = $index) {
            <button class="thumb-btn hero-thumb" [class.active]="activeImageIndex() === (thumbStartIndex() + i)" (click)="selectImage(thumbStartIndex() + i)" style="position: relative; flex: 0 0 90px; width: 90px; height: 64px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: all 0.2s ease; padding: 0; background: none;" [style.border-color]="activeImageIndex() === (thumbStartIndex() + i) ? 'var(--secondary-color)' : 'transparent'">
              <img [src]="img" [alt]="empreendimento()?.nome" style="width: 100%; height: 100%; object-fit: cover;" />
              
              <!-- 5th Image Overlay (+X fotos) on the LAST thumbnail if there are more photos -->
              @if (i === 4 && galleryImages().length > thumbStartIndex() + 5) {
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.65); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;" (click)="openLightboxForGallery(thumbStartIndex() + i); $event.stopPropagation();">
                  <span style="font-weight: 800; font-size: 1rem;">+{{ galleryImages().length - (thumbStartIndex() + 5) }}</span>
                  <span style="font-size: 0.75rem;">fotos</span>
                </div>
              }
            </button>
          }
        </div>

        <!-- Thumb Indicators (Dots/Lines) -->
        <div class="thumb-indicators" style="display: flex; gap: 4px; justify-content: center; width: 100%; padding: 0 8px;">
          @for (page of pageArray(); track page) {
            <div style="height: 3px; flex: 1; border-radius: 2px; transition: background-color 0.2s ease;" [style.background-color]="(thumbStartIndex() / 5) === page ? 'var(--secondary-color)' : 'rgba(255,255,255,0.2)'"></div>
          }
        </div>

      </div>

    </div> <!-- End inner container -->

    <!-- MAIN LEFT/RIGHT ARROWS FOR HERO -->
    <button class="slider-arrow-btn hero-nav prev" (click)="prevImage($event)" style="position: absolute; left: 40px; top: 50%; transform: translateY(-50%); width: 56px; height: 56px; border-radius: 50%; border: none; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; border: 1px solid rgba(255,255,255,0.15); pointer-events: auto; z-index: 20;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.6)'" onmouseout="this.style.backgroundColor='rgba(0,0,0,0.3)'">
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    
    <button class="slider-arrow-btn hero-nav next" (click)="nextImage($event)" style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); width: 56px; height: 56px; border-radius: 50%; border: none; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; border: 1px solid rgba(255,255,255,0.15); pointer-events: auto; z-index: 20;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.6)'" onmouseout="this.style.backgroundColor='rgba(0,0,0,0.3)'">
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>

  </div>
  
  <div class="development-detail-page">

    <!-- Tabs Bar (With Brand Blue SVG Icons) -->
    <nav class="detail-tabs" style="margin-bottom: var(--spacing-lg); border-bottom: 2px solid var(--border-color); display: flex; gap: var(--spacing-lg); overflow-x: auto; padding-bottom: 2px;">
      <button [class.active]="activeTab() === 'sobre'" (click)="setTab('sobre')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Visão geral
      </button>
      <button [class.active]="activeTab() === 'ficha'" (click)="setTab('ficha')" style="background: none; border: none; font-size: 1rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; padding: var(--spacing-sm) 0; position: relative; transition: color var(--transition-fast); white-space: nowrap; display: flex; align-items: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--primary-color)" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Ficha Técnica
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
    </nav>

    <!-- Main Content Layout Grid (Bottom Section) -->
    <div class="detail-layout-grid" style="display: grid; grid-template-columns: 2.3fr 1fr; gap: var(--spacing-lg);">
      <!-- Left Column: Active Tab Content -->
      <div class="detail-left-column" style="margin: 0; padding: 0;">
        <!-- Tab Contents -->
        <div class="tab-content-container" style="background-color: transparent; border: none; padding: 0; box-shadow: none;">
          <!-- 1. Sobre -->
          @if (activeTab() === 'sobre') {
            <section class="tab-section about-section">
              <h2 class="section-title">Sobre o empreendimento</h2>
              <div class="about-text" [innerHTML]="empreendimento()?.descricao"></div>

              <h3 class="section-subtitle">Áreas de Lazer e Conveniência</h3>
              <div class="amenities-summary-grid">
                @for (dif of diferenciais().slice(0, 6); track dif.titulo) {
                  <div class="amenity-summary-card">
                    <span class="amenity-icon">✓</span>
                    <span class="amenity-title">{{ dif.titulo }}</span>
                  </div>
                }
              </div>
            </section>
          }

          <!-- 1.5 Ficha Técnica -->
          @if (activeTab() === 'ficha') {
            <section class="tab-section ficha-section">
              <h3 class="section-subtitle">Ficha técnica</h3>
              <div style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-lg); background-color: white;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--spacing-sm); border-bottom: 1px solid var(--border-color); padding-bottom: var(--spacing-lg); margin-bottom: var(--spacing-md); flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 140px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ areaTerreno() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Área do terreno</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9" y2="6"></line><line x1="15" y1="6" x2="15" y2="6"></line><line x1="9" y1="10" x2="9" y2="10"></line><line x1="15" y1="10" x2="15" y2="10"></line><line x1="9" y1="14" x2="9" y2="14"></line><line x1="15" y1="14" x2="15" y2="14"></line><line x1="9" y1="18" x2="9" y2="18"></line><line x1="15" y1="18" x2="15" y2="18"></line></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ empreendimento()?.qtdeTorre || 1 }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Torres</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ qtdeUnidades() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Unidades</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1.2; min-width: 160px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ metragens() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Metragens</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg></span>
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0;">{{ dormitorios() }}</h4>
                      <span style="font-size: 0.75rem; color: var(--text-secondary);">Suítes</span>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; border-left: 1px solid #eaeaea; padding-left: 16px; flex: 1; min-width: 120px;">
                    <span style="color: var(--primary-color);"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="2" y="10" width="20" height="10" rx="2" ry="2"></rect><circle cx="6" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle><path d="M4 10l2-6h12l2 6"></path></svg></span>
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
            </section>
          }

          <!-- 2. Unidades -->
          @if (activeTab() === 'unidades') {
            <section class="tab-section units-section">
              <h2 class="section-title">Unidades disponíveis</h2>
              <p class="section-desc">Consulte as unidades e lotes cadastrados e sua situação comercial atualizada:</p>

              <!-- Simple search bar by Torre/Quadra and Situacao -->
              <div class="units-filter-bar" style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); flex-wrap: wrap; background: #f8f9fa; padding: var(--spacing-md); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Torre / Quadra</label>
                  <input type="text" [value]="filterTorre()" (input)="filterTorre.set($any($event.target).value)" placeholder="Buscar por torre ou quadra..." style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem;" />
                </div>
                <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Situação</label>
                  <select [value]="filterSituacao()" (change)="filterSituacao.set($any($event.target).value)" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; background: white;">
                    <option value="">Todas as Situações</option>
                    @for (sit of getUniqueSituations(); track sit) {
                      <option [value]="sit">{{ sit }}</option>
                    }
                  </select>
                </div>
              </div>

              <div class="units-table-container">
                <table class="units-table">
                  <thead>
                    <tr>
                      <th>Identificação</th>
                      <th>Torre / Quadra</th>
                      <th>Situação</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (unit of getFlatUnits(); track unit.id) {
                      <tr>
                        <td class="unit-num">{{ unit.nome }}</td>
                        <td>{{ unit.torreNome }}</td>
                        <td>
                          <span class="sit-badge" 
                                [style.background-color]="getSituacaoColor(unit.situacao).bg" 
                                [style.color]="getSituacaoColor(unit.situacao).text"
                                style="display: inline-block; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; border-radius: var(--radius-sm); text-transform: uppercase; letter-spacing: 0.03em;">
                            {{ unit.situacao }}
                          </span>
                        </td>
                        <td style="font-weight: 600; color: var(--text-primary);">
                          @if (unit.valor && unit.valor > 0) {
                            {{ unit.valor | currency:'BRL':'symbol':'1.0-0' }}
                          } @else {
                            <span style="color: var(--text-secondary); font-style: italic; font-weight: normal;">Consulte</span>
                          }
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="4" class="empty-table-cell" style="text-align: center; padding: var(--spacing-xl); color: var(--text-secondary);">Nenhuma unidade encontrada para os filtros aplicados.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>
          }

          <!-- 3. Diferenciais -->
          @if (activeTab() === 'diferenciais') {
            <section class="tab-section features-section">
              <h2 class="section-title">Diferenciais do Projeto</h2>
              <p class="section-desc">O empreendimento foi planejado nos mínimos detalhes para oferecer máxima qualidade de vida:</p>

              <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--spacing-lg);">
                @for (dif of diferenciais(); track dif.titulo) {
                  <div class="feature-card" style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-lg); background: white; box-shadow: var(--shadow-sm);">
                    <div class="feature-header" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                      <div class="feature-icon-wrapper" style="width: 40px; height: 40px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      </div>
                      <h3 class="feature-title" style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0;">{{ dif.titulo }}</h3>
                    </div>
                    <p class="feature-desc" style="font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">{{ dif.descricao }}</p>
                  </div>
                }
              </div>
            </section>
          }

          <!-- 4. Plantas -->
          @if (activeTab() === 'plantas') {
            <section class="tab-section plans-section">
              <h2 class="section-title">Plantas do Empreendimento</h2>
              <p class="section-desc">Conheça os modelos de plantas disponíveis:</p>

              <div class="plans-cards-grid" style="display: flex; gap: var(--spacing-lg); overflow-x: auto; padding-bottom: var(--spacing-md);">
                @for (planta of plantas(); track planta.nome; let idx = $index) {
                  <div class="plan-card-modern" style="flex: 0 0 300px; width: 300px; border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; background: white; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
                    
                    <!-- Card Header -->
                    <div style="padding: 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #f1f1f1;">
                      <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>
                      </div>
                      <span style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">
                        {{ getPlantaLabel(planta.nome, idx) }}
                      </span>
                    </div>

                    <!-- Plan Image -->
                    <div style="height: 180px; overflow: hidden; background: #fafafa; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center; justify-content: center; padding: 12px; cursor: zoom-in;" (click)="openLightboxForGallery(getActivePhotoIndex(planta.imagemUrl))">
                      <img [src]="planta.imagemUrl" [alt]="planta.nome" style="max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s;" />
                    </div>

                    <!-- Card Info -->
                    <div style="padding: 16px; flex-grow: 1; display: flex; flex-direction: column; gap: 4px; min-height: 90px;">
                      <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Apartamento</span>
                      <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.3;">{{ planta.nome }}</h4>
                      <span style="font-size: 0.85rem; color: #0284c7; font-weight: 700;">Opção com {{ planta.area }}m²</span>
                    </div>

                    <!-- Card Footer specs -->
                    <div style="padding: 12px 16px; background: #fafafa; border-top: 1px solid #f1f1f1; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                      <div style="display: flex; gap: 12px; font-size: 0.8rem; color: var(--text-secondary);">
                        <span style="display: flex; align-items: center; gap: 4px;">
                          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                          <strong>{{ planta.area }} m²</strong>
                        </span>
                        <span style="display: flex; align-items: center; gap: 4px;">
                          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M3 11V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"></path><path d="M12 5v14"></path><path d="M3 18v-7h18v7"></path></svg>
                          <strong>{{ planta.quartos }} dorms</strong>
                        </span>
                      </div>
                      <button (click)="openLightboxForGallery(getActivePhotoIndex(planta.imagemUrl))" style="width: 32px; height: 32px; border-radius: var(--radius-sm); border: none; background: #0b2545; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <strong style="font-size: 1.1rem; line-height: 1;">+</strong>
                      </button>
                    </div>

                  </div>
                }
              </div>
            </section>
          }

          <!-- 5. Localização -->
          @if (activeTab() === 'localizacao') {
            <section class="tab-section location-section">
              <h2 class="section-title">Localização</h2>
              <app-proximity-map
                [address]="address()"
                [lat]="empreendimento()?.latitude"
                [lng]="empreendimento()?.longitude"
                style="display:block; margin-top: var(--spacing-md);">
              </app-proximity-map>

              @if (localizacaoDestaques().length > 0) {
                <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
                  @for (dest of localizacaoDestaques(); track dest) {
                    <div style="display: flex; align-items: center; gap: 8px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 100px; font-size: 0.88rem; color: var(--text-secondary);">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="color: var(--secondary-color);"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>{{ dest }}</span>
                    </div>
                  }
                </div>
              }
            </section>
          }

          <!-- 6. Construtora -->
          @if (activeTab() === 'construtora') {
            <section class="tab-section builder-section">
              <h2 class="section-title">Sobre a Construtora</h2>
              <div style="display: flex; gap: var(--spacing-lg); align-items: flex-start; background: white; padding: var(--spacing-xl); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                @if (empreendimento()?.construtora?.logoUrl) {
                  <img [src]="empreendimento()?.construtora?.logoUrl" [alt]="empreendimento()?.construtora?.nome" style="max-width: 150px; height: auto; border-radius: var(--radius-md);" />
                }
                <div>
                  <h3 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 8px 0; color: var(--text-primary);">{{ empreendimento()?.construtora?.nome || 'Construtora' }}</h3>
                  <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">{{ empreendimento()?.construtora?.descricao || 'Empresa comprometida com a entrega de projetos de excelência, inovação e alta qualidade arquitetônica.' }}</p>
                </div>
              </div>
            </section>
          }

        </div>
      </div>

      <!-- Right Column: Lead Contact Form (Dark Theme) -->
      <aside class="detail-right-column">
        <div id="contact-form-sidebar" class="sidebar-card contact-card" style="background-color: #0b2545; border-radius: var(--radius-lg); padding: var(--spacing-xl); box-shadow: var(--shadow-lg);">
          
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: var(--spacing-lg);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" stroke-width="1.5" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="8" y1="6" x2="8.01" y2="6"></line><line x1="12" y1="6" x2="12.01" y2="6"></line><line x1="16" y1="6" x2="16.01" y2="6"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="12" y1="10" x2="12.01" y2="10"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="12" y1="14" x2="12.01" y2="14"></line><line x1="16" y1="14" x2="16.01" y2="14"></line></svg>
            </div>
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 700; color: white; margin: 0 0 4px 0;">Tenho interesse</h3>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8); margin: 0; line-height: 1.4;">Receba tabela de preços, plantas, condições especiais e disponibilidade.</p>
            </div>
          </div>
          
          @if (formSubmitted()) {
            <div class="form-success-alert" style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: var(--spacing-md); border-radius: var(--radius-md); text-align: center;">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="#22c55e" stroke-width="2" fill="none" style="margin-bottom: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <h4 style="color: white; margin: 0 0 8px 0;">Solicitação recebida!</h4>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0 0 16px 0;">Em breve um consultor entrará em contato.</p>
              <button (click)="formSubmitted.set(false)" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: var(--radius-sm); cursor: pointer;">Enviar nova mensagem</button>
            </div>
          } @else {
            <form class="contact-form" (submit)="submitInterest($event)" style="display: flex; flex-direction: column; gap: 16px;">
              <div class="form-group" style="margin: 0;">
                <label for="contact-name" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">Nome completo *</label>
                <input type="text" id="contact-name" [(ngModel)]="clientNome" name="cname" placeholder="Digite seu nome completo" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-phone" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">WhatsApp *</label>
                <input type="tel" id="contact-phone" [(ngModel)]="clientTelefone" name="cphone" placeholder="(65) 9 9999-9999" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-email" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">E-mail *</label>
                <input type="email" id="contact-email" [(ngModel)]="clientEmail" name="cemail" placeholder="seu@email.com" required style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box;" />
              </div>

              <div class="form-group" style="margin: 0;">
                <label for="contact-previsao" style="color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block;">Qual a sua previsão de compra?</label>
                <select id="contact-previsao" [(ngModel)]="clientPrevisao" name="cprevisao" style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: none; background: white; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; box-sizing: border-box; cursor: pointer;">
                  <option value="Imediata">Imediata (Menos de 3 meses)</option>
                  <option value="Medio Prazo">Médio Prazo (3 a 6 meses)</option>
                  <option value="Futuro">Futuro (Mais de 6 meses)</option>
                  <option value="Apenas Pesquisa">Estou apenas pesquisando</option>
                </select>
              </div>

              <button type="submit" [disabled]="submitting()" style="background-color: #f97316; color: white; padding: 16px; border: none; border-radius: var(--radius-lg); font-weight: 800; font-size: 1.05rem; cursor: pointer; margin-top: 8px; transition: opacity 0.2s; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2), 0 2px 4px -1px rgba(249, 115, 22, 0.1);">
                {{ submitting() ? 'Enviando...' : 'Quero receber informações' }}
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: rgba(255,255,255,0.7);">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Atendimento personalizado
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Sem compromisso
                </div>
              </div>
            </form>
          }
        </div>
      </aside>
    </div>

    <!-- Lightbox Overlay -->
    @if (lightboxOpen()) {
      <div class="lightbox-overlay" (click)="closeLightbox()"
           style="position: fixed; inset: 0; background-color: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <button (click)="prevLightbox($event)"
                style="position: absolute; left: 24px; background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 52px; height: 52px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; z-index: 10000;">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <img [src]="lightboxMode() === 'gallery' ? galleryImages()[lightboxIndex()] : filteredPhotos()[lightboxIndex()]?.url" style="max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 8px;" (click)="$event.stopPropagation()" />
        <button (click)="nextLightbox($event)"
                style="position: absolute; right: 24px; background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 52px; height: 52px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; z-index: 10000;">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button (click)="closeLightbox()"
                style="position: absolute; top: 24px; right: 24px; background: rgba(255,255,255,0.15); border: none; border-radius: 50%; width: 44px; height: 44px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; z-index: 10000;">✕</button>
        <div style="position: absolute; bottom: 24px; color: rgba(255,255,255,0.7); font-size: 0.9rem;">
          {{ lightboxIndex() + 1 }} / {{ lightboxMode() === 'gallery' ? galleryImages().length : filteredPhotos().length }}
        </div>
      </div>
    }
  </div>
}
`;

fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', fullHTML, 'utf8');
console.log('MASTER RESTORE COMPLETED SUCCESSFULLY!');
