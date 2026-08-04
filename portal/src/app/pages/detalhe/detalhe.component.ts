import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmpreendimentoService } from '../../core/services/empreendimento.service';
import { ProximityMapComponent } from './proximity-map/proximity-map.component';
import { environment } from '../../../environments/environment';

interface MockPlanta {
  nome: string;
  area: number;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  imagemUrl: string;
}

interface MockDiferencial {
  titulo: string;
  descricao: string;
  icone: string;
}

interface CategorizedPhoto {
  url: string;
  tipo: string;
  destaquePrincipal: boolean;
  arquivo: string;
}

@Component({
  selector: 'app-detalhe',
  imports: [CommonModule, FormsModule, RouterModule, ProximityMapComponent],
  templateUrl: './detalhe.component.html'
})
export class DetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private empreendimentoService = inject(EmpreendimentoService);

  // Signals for state
  protected id = signal<number | null>(null);
  protected empreendimento = signal<any>(null);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  // Gallery
  protected activeImageIndex = signal(0);
  protected galleryImages = signal<string[]>([]);
  
  protected thumbStartIndex = computed(() => Math.floor(this.activeImageIndex() / 5) * 5);
  protected visibleThumbs = computed(() => this.galleryImages().slice(this.thumbStartIndex(), this.thumbStartIndex() + 5));
  protected totalPages = computed(() => Math.ceil(this.galleryImages().length / 5));
  protected pageArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i));

  // Tabs
  protected activeTab = signal<'sobre' | 'unidades' | 'plantas' | 'diferenciais' | 'localizacao' | 'construtora'>('sobre');

  // Contact Form
  protected clientNome = '';
  protected clientTelefone = '';
  protected clientEmail = '';
  protected clientPrevisao = 'Imediata';
  protected formSubmitted = signal(false);
  protected submitting = signal(false);

  // Enriched Mock details
  protected address = signal('Rua das Orquídeas, 123 - Jardim das Américas, Cuiabá - MT');
  protected areaTerreno = signal('3.820,00 m²');
  protected qtdeUnidades = signal(0);
  protected dormitorios = signal('2 a 3 quartos');
  protected vagas = signal('1 a 2 vagas');
  protected metragens = signal('120 a 145 m²');
  protected localizacaoDestaques = signal<string[]>([]);
  protected plantas = signal<MockPlanta[]>([]);
  protected diferenciais = signal<MockDiferencial[]>([]);

  // Categorized photo gallery
  protected categorizedPhotos = signal<CategorizedPhoto[]>([]);
  protected activePhotoFilter = signal('Todas as Fotos');
  protected lightboxOpen = signal(false);
  protected lightboxIndex = signal(0);

  protected availablePhotoTypes = computed(() => {
    const types = [...new Set(this.categorizedPhotos().map(p => p.tipo))];
    return types.sort();
  });

  protected filteredPhotos = computed(() => {
    const filter = this.activePhotoFilter();
    if (filter === 'Todas as Fotos') return this.categorizedPhotos();
    return this.categorizedPhotos().filter(p => p.tipo === filter);
  });

  protected mapEmbedUrl = computed((): SafeResourceUrl => {
    const addr = this.address();
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&output=embed&z=15`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id.set(+idParam);
        this.loadDetails(+idParam);
      }
    });
  }

  private loadDetails(id: number) {
    this.loading.set(true);
    this.empreendimentoService.getById(id).subscribe({
      next: (data) => {
        this.empreendimento.set(data);
        this.enrichData(data);
        
        // Fetch actual legacy photos on disk from our new API endpoint
        this.http.get<string[]>(`${environment.apiUrl}/api/empreendimentos/${id}/photos`).subscribe({
          next: (photos) => {
            if (photos && photos.length > 0) {
              this.galleryImages.set(photos);
            }
          },
          error: (err) => console.error('Erro ao buscar fotos:', err)
        });

        // Fetch categorized photos from fotos table
        this.http.get<CategorizedPhoto[]>(`${environment.apiUrl}/api/empreendimentos/${id}/photos-categorized`).subscribe({
          next: (photos) => {
            if (photos && photos.length > 0) {
              this.categorizedPhotos.set(photos);
            }
          },
          error: (err) => console.error('Erro ao buscar fotos categorizadas:', err)
        });
        
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes:', err);
        this.error.set('Empreendimento não encontrado ou indisponível.');
        this.loading.set(false);
      }
    });
  }


  private enrichData(data: any) {
    const name = data.nome.toLowerCase();

    // 1. Setup Gallery Images
    let images: string[] = [];
    if (name.includes('volare')) {
      images = [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ];
      this.address.set('Rua Estevão de Mendonça, 450 - Centro-Sul, Cuiabá - MT');
      this.areaTerreno.set('2.450,00 m²');
      this.metragens.set('120 a 145 m²');
      this.dormitorios.set('3 quartos');
      this.vagas.set('2 vagas');
      this.localizacaoDestaques.set([
        '3 min do Parque Mãe Bonifácia',
        '5 min do Goiabeiras Shopping',
        '6 min do Hospital Santa Rosa'
      ]);
    } else if (name.includes('bravie')) {
      images = [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ];
      this.address.set('Av. Miguel Sutil, 2300 - Bosque da Saúde, Cuiabá - MT');
      this.areaTerreno.set('3.100,00 m²');
      this.metragens.set('105 a 125 m²');
      this.dormitorios.set('2 a 3 quartos');
      this.vagas.set('1 a 2 vagas');
      this.localizacaoDestaques.set([
        '2 min do Shopping Pantanal',
        '4 min do Parque da Família',
        '5 min da Assembleia Legislativa'
      ]);
    } else if (name.includes('vox')) {
      images = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ];
      this.address.set('Rua das Orquídeas, 123 - Jardim Aclimação, Cuiabá - MT');
      this.areaTerreno.set('2.560,00 m²');
      this.metragens.set('121 a 122 m²');
      this.dormitorios.set('2 a 3 quartos');
      this.vagas.set('1 a 2 vagas');
      this.localizacaoDestaques.set([
        '5 min do Shopping Pantanal',
        '3 min do Parque Mãe Bonifácia',
        '7 min do Hospital Jardim Cuiabá'
      ]);
    } else {
      images = [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
      ];
      this.address.set('Av. dos Lagos, S/N - Jardim das Américas, Cuiabá - MT');
      this.areaTerreno.set('150.000,00 m²');
      this.metragens.set('200 a 680 m²');
      this.dormitorios.set('3 a 4 suítes');
      this.vagas.set('2 a 4 vagas');
      this.localizacaoDestaques.set([
        '1 min do Lago Principal',
        '10 min do Shopping 3 Américas',
        '8 min da UFMT'
      ]);
    }
    this.galleryImages.set(images);

    // 2. Calculate dynamic count of units
    let totalUnidades = 0;
    if (data.torres) {
      data.torres.forEach((t: any) => {
        if (t.unidades) {
          totalUnidades += t.unidades.length;
        } else {
          totalUnidades += 40; // Default fallback for visuals
        }
      });
    }
    this.qtdeUnidades.set(totalUnidades || 48);

    // 3. Mock Plantas
    this.plantas.set([
      {
        nome: 'Planta Standard',
        area: name.includes('lagos') ? 250 : 105,
        quartos: 3,
        suites: 1,
        banheiros: 2,
        vagas: 1,
        descricao: 'Apartamento com ótimo aproveitamento de espaço, varanda integrada e cozinha americana.',
        imagemUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
      },
      {
        nome: 'Planta Executive',
        area: name.includes('lagos') ? 350 : 122,
        quartos: 3,
        suites: 2,
        banheiros: 3,
        vagas: 2,
        descricao: 'Planta ampliada com varanda gourmet, churrasqueira a carvão e lavabo.',
        imagemUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
      },
      {
        nome: 'Planta Master Duplex',
        area: name.includes('lagos') ? 500 : 145,
        quartos: 3,
        suites: 3,
        banheiros: 4,
        vagas: 2,
        descricao: 'Cobertura Duplex de altíssimo padrão, living com pé direito duplo e piscina privativa.',
        imagemUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
      }
    ]);

    // 4. Mock Diferenciais
    this.diferenciais.set([
      { titulo: 'Lazer completo equipado', icone: 'award', descricao: 'Áreas equipadas com acabamentos de alto padrão.' },
      { titulo: 'Piscina com deck molhado', icone: 'droplet', descricao: 'Piscina aquecida para adultos e crianças com prainha.' },
      { titulo: 'Salão de festas', icone: 'users', descricao: 'Salão modulável com ar condicionado e cozinha de apoio.' },
      { titulo: 'Espaço gourmet', icone: 'coffee', descricao: 'Espaço reservado para encontros intimistas com forno de pizza.' },
      { titulo: 'Academia profissional', icone: 'activity', descricao: 'Espaço climatizado com equipamentos de última geração.' },
      { titulo: 'Playground', icone: 'heart', descricao: 'Parquinho seguro para desenvolvimento motor infantil.' },
      { titulo: 'Coworking', icone: 'briefcase', descricao: 'Estações de trabalho equipadas com internet de alta velocidade.' },
      { titulo: 'Bicicletário', icone: 'map', descricao: 'Área com bancada de manutenção e tomadas para recarga.' },
      { titulo: 'Portaria 24h', icone: 'shield', descricao: 'Monitoramento por câmeras e acesso controlado facial.' }
    ]);
  }

  protected setTab(tab: 'sobre' | 'unidades' | 'plantas' | 'diferenciais' | 'localizacao' | 'construtora') {
    this.activeTab.set(tab);
  }

  protected prevImage(event: Event) {
    event.stopPropagation();
    const active = this.activeImageIndex();
    const total = this.galleryImages().length;
    this.activeImageIndex.set((active - 1 + total) % total);
  }

  protected nextImage(event: Event) {
    event.stopPropagation();
    const active = this.activeImageIndex();
    const total = this.galleryImages().length;
    this.activeImageIndex.set((active + 1) % total);
  }

  protected selectImage(index: number) {
    this.activeImageIndex.set(index);
  }

  // Unit filters
  protected filterTorre = signal('');
  protected filterSituacao = signal('');

  protected getUniqueSituations = computed(() => {
    const list: string[] = [];
    if (this.empreendimento()) {
      const collect = (unidades: any[]) => {
        if (unidades) {
          unidades.forEach(u => {
            if (u.situacao && !list.includes(u.situacao)) {
              list.push(u.situacao);
            }
          });
        }
      };
      if (this.empreendimento().torres) {
        this.empreendimento().torres.forEach((t: any) => collect(t.unidades));
      }
      if (this.empreendimento().quadras) {
        this.empreendimento().quadras.forEach((q: any) => collect(q.unidades));
      }
    }
    return list;
  });

  protected getSituacaoColor(situacao: string): { bg: string, text: string } {
    const sit = (situacao || '').toLowerCase().trim();
    if (sit.includes('vendida') || sit.includes('vendido')) {
      return { bg: '#fee2e2', text: '#ef4444' };
    } else if (sit.includes('disponivel') || sit.includes('liberada') || sit.includes('liberado') || sit.includes('disponível')) {
      return { bg: '#dcfce7', text: '#22c55e' };
    } else if (sit.includes('reservada') || sit.includes('reservado')) {
      return { bg: '#fef3c7', text: '#d97706' };
    } else if (sit.includes('bloqueada') || sit.includes('bloqueado')) {
      return { bg: '#f3f4f6', text: '#4b5563' };
    }
    return { bg: '#e0f2fe', text: '#0284c7' };
  }

  protected getFlatUnits(): any[] {
    const list: any[] = [];
    if (this.empreendimento()) {
      if (this.empreendimento().torres) {
        this.empreendimento().torres.forEach((torre: any) => {
          if (torre.unidades) {
            torre.unidades.forEach((u: any) => {
              list.push({
                id: u.id,
                nome: u.nome,
                torreNome: torre.nome,
                situacao: u.situacao,
                status: u.status,
                valor: u.valor || u.preco
              });
            });
          }
        });
      }
      if (this.empreendimento().quadras) {
        this.empreendimento().quadras.forEach((quadra: any) => {
          if (quadra.unidades) {
            quadra.unidades.forEach((u: any) => {
              list.push({
                id: u.id,
                nome: u.nome,
                torreNome: quadra.nome,
                situacao: u.situacao,
                status: u.status,
                valor: u.valor || u.preco
              });
            });
          }
        });
      }
    }

    return list.filter(u => {
      const matchTorre = !this.filterTorre() || u.torreNome.toLowerCase().includes(this.filterTorre().toLowerCase());
      const matchSituacao = !this.filterSituacao() || u.situacao.toLowerCase() === this.filterSituacao().toLowerCase();
      return matchTorre && matchSituacao;
    });
  }

  protected submitInterest(event: Event) {
    event.preventDefault();
    if (!this.clientNome || !this.clientTelefone || !this.clientEmail) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.submitting.set(true);
    const emp = this.empreendimento();

    const leadPayload = {
      construtoraId: emp.construtoraId,
      empreendimentoId: emp.id,
      nome: this.clientNome,
      email: this.clientEmail,
      telefone: this.clientTelefone,
      mensagem: `Interesse enviado através do portal. Previsão de compra: ${this.clientPrevisao}`,
      status: 'Novo'
    };

    this.http.post(`${environment.apiUrl}/api/leads`, leadPayload).subscribe({
      next: () => {
        this.formSubmitted.set(true);
        this.submitting.set(false);
        this.clientNome = '';
        this.clientEmail = '';
        this.clientTelefone = '';
      },
      error: (err) => {
        console.error('Erro ao enviar lead:', err);
        alert('Ocorreu um erro ao enviar suas informações. Tente novamente mais tarde.');
        this.submitting.set(false);
      }
    });
  }

  // Lightbox Mode: 'gallery' for the main top carrousel, 'categorized' for bottom gallery
  protected lightboxMode = signal<'gallery' | 'categorized'>('categorized');

  protected shareLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    } else {
      alert('URL da página: ' + window.location.href);
    }
  }

  protected scrollToForm() {
    const el = document.getElementById('contact-form-sidebar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  protected setPhotoFilter(filter: string) {
    this.activePhotoFilter.set(filter);
    this.lightboxOpen.set(false);
  }

  protected openLightbox(index: number) {
    this.lightboxMode.set('categorized');
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  protected openLightboxForGallery(index: number) {
    this.lightboxMode.set('gallery');
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  protected closeLightbox() {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  protected prevLightbox(event: Event) {
    event.stopPropagation();
    const current = this.lightboxIndex();
    const total = this.lightboxMode() === 'gallery' ? this.galleryImages().length : this.filteredPhotos().length;
    this.lightboxIndex.set((current - 1 + total) % total);
    if (this.lightboxMode() === 'gallery') {
      this.activeImageIndex.set(this.lightboxIndex());
    }
  }

  protected nextLightbox(event: Event) {
    event.stopPropagation();
    const current = this.lightboxIndex();
    const total = this.lightboxMode() === 'gallery' ? this.galleryImages().length : this.filteredPhotos().length;
    this.lightboxIndex.set((current + 1) % total);
    if (this.lightboxMode() === 'gallery') {
      this.activeImageIndex.set(this.lightboxIndex());
    }
  }

  protected plantasDaDatabase = computed(() => {
    const list: any[] = [];
    this.categorizedPhotos().forEach((p: any) => {
      if (p.plantaId || p.destaquePlanta === 'Sim' || (p.nome && p.nome.toLowerCase().includes('planta'))) {
        const name = p.nome || 'Planta';
        let area = 0;
        let quartos = 0;
        let suites = 0;
        
        const areaMatch = name.match(/(\d+([.,]\d+)?)\s*m/i);
        if (areaMatch) {
          area = parseFloat(areaMatch[1].replace(',', '.'));
        }
        
        const dormMatch = name.match(/(\d+)\s*(dorms|quartos|dormitórios|quarto)/i);
        if (dormMatch) {
          quartos = parseInt(dormMatch[1]);
        }
        
        const suiteMatch = name.match(/(\d+)\s*suíte/i);
        if (suiteMatch) {
          suites = parseInt(suiteMatch[1]);
        }

        list.push({
          nome: name,
          area: area || 120,
          quartos: quartos || 3,
          suites: suites || 1,
          banheiros: suites + 1 || 2,
          vagas: 2,
          descricao: 'Planta disponível para este empreendimento.',
          imagemUrl: p.url
        });
      }
    });
    
    if (list.length === 0) {
      return this.plantas();
    }
    return list;
  });

  protected getPlantaLabel(nome: string, index: number): string {
    const clean = (nome || '').toUpperCase();
    if (clean.includes('PLANTA A') || clean.includes('TIPO A')) return 'A';
    if (clean.includes('PLANTA B') || clean.includes('TIPO B')) return 'B';
    if (clean.includes('PLANTA C') || clean.includes('TIPO C')) return 'C';
    
    const match = clean.match(/PLANTA\s*([A-Z0-9\-_]+)/i);
    if (match) return match[1];
    
    return `Planta ${index + 1}`;
  }

  protected getActivePhotoIndex(imageUrl: string): number {
    const idx = this.galleryImages().indexOf(imageUrl);
    return idx >= 0 ? idx : 0;
  }
}

