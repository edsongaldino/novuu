import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-favoritos',
  template: `
    <div class="favoritos-header">
      <div class="header-texts">
        <h1>Favoritos</h1>
        <p>Seus imóveis salvos para acompanhar mais de perto.</p>
      </div>
      <div class="badge">8 imóveis salvos</div>
    </div>

    <div class="favoritos-tabs">
      <button class="tab-btn active">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M2 18h10"></path></svg>
        Imóveis Salvos
      </button>
    </div>

    <div class="favoritos-toolbar">
      <div class="search-box">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#888" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" placeholder="Buscar nos seus favoritos...">
      </div>
      <div class="toolbar-actions">
        <button class="tool-btn"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filtros</button>
        <button class="tool-btn"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> Mais recentes</button>
      </div>
    </div>

    <div class="cards-grid">
      <!-- Card 1 -->
      <div class="property-card">
        <div class="card-image">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80" alt="Residencial Aurora">
          <div class="card-badges">
            <span class="status-badge blue">Lançamento</span>
            <button class="heart-btn active">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
        <div class="card-content">
          <h3>Residencial Aurora</h3>
          <p class="location"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Jardim das Américas, Cuiabá/MT</p>
          <div class="tags">
            <span>Plaenge</span><span>Vertical</span><span>Apartamento</span>
          </div>
          <div class="card-footer">
            <div class="price">A partir de <strong>R$ 350 mil</strong></div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#2b5cff" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="property-card">
        <div class="card-image">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80" alt="Vila Parque">
          <div class="card-badges">
            <span class="status-badge orange">Em obras</span>
            <button class="heart-btn active">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
        <div class="card-content">
          <h3>Vila Parque</h3>
          <p class="location"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Ribeirão do Lipa, Cuiabá/MT</p>
          <div class="tags">
            <span>MRV</span><span>Vertical</span><span>Apartamento</span>
          </div>
          <div class="card-footer">
            <div class="price">A partir de <strong>R$ 280 mil</strong></div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#2b5cff" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .favoritos-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
    .header-texts h1 { font-size: 28px; color: #091b3d; margin-bottom: 5px; font-weight: 700; }
    .header-texts p { color: #666; font-size: 15px; margin: 0; }
    .badge { background: #eef5fc; color: #2b5cff; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    
    .favoritos-tabs { display: flex; gap: 20px; border-bottom: 1px solid #eaeaea; margin-bottom: 20px; }
    .tab-btn {
      background: none; border: none; padding: 12px 0; color: #666; font-size: 15px; font-weight: 600;
      display: flex; align-items: center; gap: 8px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px;
    }
    .tab-btn.active { color: #2b5cff; border-bottom-color: #2b5cff; }

    .favoritos-toolbar { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 25px; }
    .search-box {
      flex: 1; display: flex; align-items: center; gap: 10px; background: white;
      border: 1px solid #eaeaea; border-radius: 8px; padding: 0 15px; height: 44px;
    }
    .search-box input { border: none; outline: none; width: 100%; font-family: inherit; font-size: 14px; }
    .toolbar-actions { display: flex; gap: 10px; }
    .tool-btn {
      background: white; border: 1px solid #eaeaea; border-radius: 8px; padding: 0 15px; height: 44px;
      display: flex; align-items: center; gap: 8px; color: #444; font-weight: 600; font-size: 14px; cursor: pointer;
    }

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .property-card {
      background: white; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;
      display: flex; flex-direction: column; transition: 0.2s; cursor: pointer;
    }
    .property-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.05); transform: translateY(-2px); }
    .card-image { position: relative; height: 180px; }
    .card-image img { width: 100%; height: 100%; object-fit: cover; }
    .card-badges { position: absolute; top: 12px; left: 12px; right: 12px; display: flex; justify-content: space-between; align-items: flex-start; }
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; }
    .status-badge.blue { background: #2b5cff; }
    .status-badge.orange { background: #ff7300; }
    .heart-btn {
      background: white; border: none; width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center; color: #ccc; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .heart-btn.active { color: #e74c3c; }
    
    .card-content { padding: 16px; display: flex; flex-direction: column; flex: 1; }
    .card-content h3 { font-size: 18px; color: #091b3d; margin-bottom: 6px; font-weight: 700; }
    .location { color: #666; font-size: 13px; display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
    .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
    .tags span { background: #f0f4f8; color: #555; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    
    .card-footer { margin-top: auto; padding-top: 16px; border-top: 1px solid #eaeaea; display: flex; justify-content: space-between; align-items: center; }
    .price { font-size: 13px; color: #666; }
    .price strong { font-size: 18px; color: #091b3d; font-weight: 800; display: block; }
  `
})
export class FavoritosComponent {}
