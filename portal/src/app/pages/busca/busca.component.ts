import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { EmpreendimentoService, EmpreendimentoListItem } from '../../core/services/empreendimento.service';
import { CidadeService, Cidade } from '../../core/services/cidade.service';

interface EnrichedEmpreendimento extends EmpreendimentoListItem {
  bairroName: string;
  uf: string;
  metragens: string;
  dormitorios: string;
  vagas: string;
  imagemUrl: string;
  logoConstrutora: string;
  modalidade: string;
  wishlist: boolean;
  cidadeId: number;
}

@Component({
  selector: 'app-busca',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './busca.component.html'
})
export class BuscaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empreendimentoService = inject(EmpreendimentoService);
  private cidadeService = inject(CidadeService);

  // Filter signals
  protected query = signal('');
  protected selectedCidadeId = signal<number | null>(null);
  protected selectedConstrutoraId = signal<number | null>(null);
  protected selectedTipo = signal('');
  protected precoMin = signal<number | null>(null);
  protected precoMax = signal<number | null>(null);
  protected modalidade = signal('');
  protected areaMin = signal<number | null>(null);
  protected areaMax = signal<number | null>(null);

  protected showAdvanced = signal(false);
  protected viewMode = signal<'list' | 'grid'>('list');
  protected orderBy = signal('valor-asc');

  // Lists
  protected cidadesList = signal<Cidade[]>([]);
  protected results = signal<EnrichedEmpreendimento[]>([]);
  protected loading = signal(false);

  // Pagination
  protected currentPage = signal(1);
  protected totalItems = signal(0);
  protected pageSize = signal(10);

  ngOnInit() {
    // Load cities
    this.cidadeService.getCidades().subscribe({
      next: (data) => this.cidadesList.set(data),
      error: (err) => console.error('Erro ao buscar cidades:', err)
    });

    // Subscribe to query parameters
    this.route.queryParams.subscribe(params => {
      if (params['query']) this.query.set(params['query']);
      if (params['cidadeId']) this.selectedCidadeId.set(+params['cidadeId']);
      if (params['construtoraId']) this.selectedConstrutoraId.set(+params['construtoraId']);
      if (params['tipo']) this.selectedTipo.set(params['tipo']);
      if (params['precoMinimo']) this.precoMin.set(+params['precoMinimo']);
      if (params['precoMaximo']) this.precoMax.set(+params['precoMaximo']);
      
      this.executeSearch();
    });
  }

  protected toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'list' ? 'grid' : 'list');
  }

  protected toggleAdvanced() {
    this.showAdvanced.set(!this.showAdvanced());
  }

  protected applyFilters() {
    const queryParams: any = {};
    if (this.query()) queryParams.query = this.query();
    if (this.selectedCidadeId()) queryParams.cidadeId = this.selectedCidadeId();
    if (this.selectedConstrutoraId()) queryParams.construtoraId = this.selectedConstrutoraId();
    if (this.selectedTipo()) queryParams.tipo = this.selectedTipo();
    if (this.precoMin()) queryParams.precoMinimo = this.precoMin();
    if (this.precoMax()) queryParams.precoMaximo = this.precoMax();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  protected executeSearch() {
    this.loading.set(true);
    this.empreendimentoService.search({
      query: this.query() || undefined,
      cidadeId: this.selectedCidadeId() || undefined,
      tipo: this.selectedTipo() || undefined,
      precoMinimo: this.precoMin() || undefined,
      precoMaximo: this.precoMax() || undefined
    }).subscribe({
      next: (data) => {
        let enriched = data.map(item => this.enrichItem(item));

        // Client-side filtering for fields not directly handled by API
        if (this.selectedConstrutoraId()) {
          const cid = this.selectedConstrutoraId();
          enriched = enriched.filter(e => {
            if (cid === 1) return e.construtoraNome.toLowerCase().includes('plaenge');
            if (cid === 2) return e.construtoraNome.toLowerCase().includes('ginco');
            return true;
          });
        }

        if (this.modalidade()) {
          const mod = this.modalidade().toLowerCase();
          enriched = enriched.filter(e => e.modalidade.toLowerCase().includes(mod));
        }

        if (this.areaMin()) {
          const min = this.areaMin()!;
          enriched = enriched.filter(e => {
            const match = e.metragens.match(/(\d+)/);
            if (match) {
              const num = parseInt(match[1], 10);
              return num >= min;
            }
            return true;
          });
        }

        if (this.areaMax()) {
          const max = this.areaMax()!;
          enriched = enriched.filter(e => {
            const match = e.metragens.match(/(\d+)/);
            if (match) {
              const num = parseInt(match[1], 10);
              return num <= max;
            }
            return true;
          });
        }

        // Apply Sorting
        this.sortResults(enriched);

        this.totalItems.set(enriched.length);
        this.results.set(enriched);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro na pesquisa:', err);
        this.loading.set(false);
      }
    });
  }

  private sortResults(items: EnrichedEmpreendimento[]) {
    const criteria = this.orderBy();
    if (criteria === 'valor-asc') {
      items.sort((a, b) => (a.valorInicial || 0) - (b.valorInicial || 0));
    } else if (criteria === 'valor-desc') {
      items.sort((a, b) => (b.valorInicial || 0) - (a.valorInicial || 0));
    } else if (criteria === 'nome') {
      items.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  }

  protected onOrderChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.orderBy.set(value);
    const currentResults = [...this.results()];
    this.sortResults(currentResults);
    this.results.set(currentResults);
  }

  protected toggleWishlist(item: EnrichedEmpreendimento, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    item.wishlist = !item.wishlist;
  }

  private enrichItem(item: EmpreendimentoListItem): EnrichedEmpreendimento {
    const name = item.nome.toLowerCase();
    let bairro = 'Centro';
    let uf = 'MT';
    let metragens = '120 a 145 m²';
    let dormitorios = '3 quartos';
    let vagas = '2 vagas';
    
    // Check logomarca and construct correct image url using our new static file server path
    let img = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
    if (item.logomarca) {
      if (item.logomarca.startsWith('data:')) {
        img = item.logomarca;
      } else if (item.logomarca.includes('/')) {
        img = `${environment.apiUrl}/${item.logomarca}`;
      } else {
        img = `${environment.apiUrl}/uploads/empreendimento/${item.id}/arquivo/${item.logomarca}`;
      }
    }

    let logo = item.construtoraNome || 'PLAENGE';
    let modalidade = 'Lançamento';
    let cidadeId = 1;

    if (name.includes('volare')) {
      bairro = 'Centro-Sul';
      metragens = '120 a 145 m²';
      dormitorios = '3 quartos';
      vagas = '2 vagas';
      if (!item.logomarca) img = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
      logo = 'PLAENGE';
      modalidade = 'Pronto';
    } else if (name.includes('bravie')) {
      bairro = 'Bosque da Saúde';
      metragens = '105 a 125 m²';
      dormitorios = '2 a 3 quartos';
      vagas = '1 a 2 vagas';
      if (!item.logomarca) img = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80';
      logo = 'PLAENGE';
      modalidade = 'Em Obras';
    } else if (name.includes('vox')) {
      bairro = 'Jardim Aclimação';
      metragens = '121 a 122 m²';
      dormitorios = '2 a 3 quartos';
      vagas = '1 a 2 vagas';
      if (!item.logomarca) img = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
      logo = 'PLAENGE';
      modalidade = 'Lançamento';
    } else if (name.includes('lagos') || name.includes('florais')) {
      bairro = 'Jardim das Américas';
      metragens = '200 a 680 m²';
      dormitorios = '3 a 4 suítes';
      vagas = '2 a 4 vagas';
      if (!item.logomarca) img = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80';
      logo = 'GINCO';
      modalidade = 'Pronto';
    }

    return {
      ...item,
      bairroName: bairro,
      uf,
      metragens,
      dormitorios,
      vagas,
      imagemUrl: img,
      logoConstrutora: logo,
      modalidade,
      wishlist: false,
      cidadeId
    };
  }

  // Get paginated results
  protected getPaginatedResults(): EnrichedEmpreendimento[] {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.results().slice(startIndex, startIndex + this.pageSize());
  }

  protected setPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize()) || 1;
  }

  protected getPagesArray(): number[] {
    const total = this.totalPages();
    const arr = [];
    for (let i = 1; i <= total; i++) arr.push(i);
    return arr;
  }

  protected onPageSizeChange(event: Event) {
    const size = +(event.target as HTMLSelectElement).value;
    this.pageSize.set(size);
    this.currentPage.set(1); // reset to page 1
  }
}
