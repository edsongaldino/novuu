import { Component, inject, signal, computed, OnInit, HostListener } from '@angular/core';
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
  protected activeTab = signal<'sobre' | 'ficha' | 'unidades' | 'plantas' | 'lazer' | 'diferenciais' | 'localizacao' | 'construtora' | 'tour' | 'fotos'>('sobre');

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
  public plantasDoBanco = signal<any[]>([]);
  public lazerDoBanco = signal<any[]>([]);
  public diferenciaisDoBanco = signal<any[]>([]);
  public todasCaracteristicas = signal<any[]>([]);
  protected diferenciais = signal<MockDiferencial[]>([]);

  public outrosEmpreendimentos = signal<any[]>([
    {
      id: 1,
      nome: 'Reserva do Parque',
      cidade: 'Cuiabá - MT',
      tipo: 'Lotes',
      status: 'Entregue',
      imagemUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      nome: 'Villaggio di Roma',
      cidade: 'Várzea Grande - MT',
      tipo: 'Casas',
      status: 'Entregue',
      imagemUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      nome: 'Essencial Home',
      cidade: 'Cuiabá - MT',
      tipo: 'Apartamentos',
      status: '2024',
      imagemUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      nome: 'Jardins do Lago',
      cidade: 'Cuiabá - MT',
      tipo: 'Lotes',
      status: '2025',
      imagemUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  // Categorized photo gallery
  protected construtoraDetails = signal<any>(null);
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

        // Fetch construtora legacy details
        this.http.get<any>(`${environment.apiUrl}/api/empreendimentos/${id}/construtora`).subscribe({
          next: (cData) => {
            if (cData) {
              this.construtoraDetails.set(cData);
            }
          },
          error: (err) => console.error('Erro ao buscar detalhes da construtora:', err)
        });
        
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
        // Fetch plantas from database
        this.http.get<any[]>(`${environment.apiUrl}/api/empreendimentos/${id}/plantas`).subscribe({
          next: (plantas) => {
            if (plantas && plantas.length > 0) {
              this.plantasDoBanco.set(plantas);
            }
          },
          error: (err) => console.error('Erro ao buscar plantas:', err)
        });
        // Fetch caracteristicas e lazer from database
        this.http.get<any>(`${environment.apiUrl}/api/empreendimentos/${id}/caracteristicas`).subscribe({
          next: (res) => {
            if (res) {
              if (res.todas && res.todas.length > 0) {
                this.todasCaracteristicas.set(res.todas);
              }
              if (res.lazer && res.lazer.length > 0) {
                this.lazerDoBanco.set(res.lazer);
              }
              if (res.diferenciais && res.diferenciais.length > 0) {
                this.diferenciaisDoBanco.set(res.diferenciais);
              }
            }
          },
          error: (err) => console.error('Erro ao buscar características:', err)
        });

        // Fetch outros empreendimentos dynamically with real destaque_principal photos
        this.empreendimentoService.search({}).subscribe({
          next: (list) => {
            if (list && list.length > 0) {
              const outros = list
                .filter(item => item.id !== id)
                .slice(0, 4)
                .map(item => {
                  let img = '';
                  if (item.imagemUrl) {
                    img = item.imagemUrl.startsWith('http') ? item.imagemUrl : `${environment.apiUrl}${item.imagemUrl}`;
                  } else if (item.logomarca) {
                    if (item.logomarca.startsWith('data:')) {
                      img = item.logomarca;
                    } else if (item.logomarca.includes('/')) {
                      img = `${environment.apiUrl}/${item.logomarca}`;
                    } else {
                      img = `${environment.apiUrl}/uploads/empreendimento/${item.id}/arquivo/${item.logomarca}`;
                    }
                  } else {
                    img = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
                  }

                  return {
                    id: item.id,
                    nome: item.nome,
                    cidade: 'Cuiabá - MT',
                    tipo: item.tipo || 'Lançamento',
                    status: item.previsaoEntrega || 'Entregue',
                    imagemUrl: img
                  };
                });

              if (outros.length > 0) {
                this.outrosEmpreendimentos.set(outros);
              }
            }
          },
          error: (err) => console.error('Erro ao buscar outros empreendimentos:', err)
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

    // 0. Format Address dynamically from DB
    let formattedAddress = '';
    if (data.enderecoFormatado) {
      formattedAddress = data.enderecoFormatado;
    } else if (data.endereco) {
      const e = data.endereco;
      const log = (e.logradouro || e.Logradouro || '').trim();
      const num = (e.numero || e.Numero || '').trim();
      const logNum = log ? (num && num !== '0' ? `${log}, ${num}` : `${log}, S/N`) : '';
      const bairro = e.bairro?.nome || e.bairro?.Nome || e.bairroNome || '';
      const cidade = e.cidade?.nome || e.cidade?.Nome || e.cidadeNome || '';
      const uf = e.estado?.uf || e.estado?.Uf || e.estadoUf || '';
      
      const parts = [logNum, bairro, cidade && uf ? `${cidade} - ${uf}` : cidade || uf].filter(Boolean);
      formattedAddress = parts.join(' - ');
    }

    if (formattedAddress) {
      this.address.set(formattedAddress);
    }

    // 1. Setup Gallery Images
    let images: string[] = [];
    if (name.includes('volare')) {
      images = [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ];
      if (!formattedAddress) this.address.set('Rua Estevão de Mendonça, 450 - Centro-Sul, Cuiabá - MT');
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
      if (!formattedAddress) this.address.set('Av. Miguel Sutil, 2300 - Bosque da Saúde, Cuiabá - MT');
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
      if (!formattedAddress) this.address.set('Rua das Orquídeas, 123 - Jardim Aclimação, Cuiabá - MT');
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
      if (!formattedAddress) this.address.set('Av. dos Lagos, S/N - Jardim das Américas, Cuiabá - MT');
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

  protected showScrollTop = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 350);
  }

  protected scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected setTab(tab: 'sobre' | 'ficha' | 'unidades' | 'plantas' | 'lazer' | 'diferenciais' | 'localizacao' | 'construtora' | 'tour' | 'fotos') {
    if (tab === 'plantas' || tab === 'localizacao' || tab === 'fotos') {
      const element = document.getElementById(`section-${tab}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tab === 'fotos' && this.galleryImages().length > 0) {
        this.openLightboxForGallery(0);
      }
      return;
    }
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

  protected submitInterest(event?: Event, channel: 'whatsapp' | 'phone' = 'whatsapp') {
    if (event) event.preventDefault();
    if (!this.clientNome || !this.clientTelefone || !this.clientEmail) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, WhatsApp e E-mail) para prosseguir.');
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
      mensagem: `Interesse enviado via ${channel === 'whatsapp' ? 'WhatsApp' : 'Ligação Central'}. Previsão de compra: ${this.clientPrevisao}`,
      status: 'Novo'
    };

    this.http.post(`${environment.apiUrl}/api/leads`, leadPayload).subscribe({
      next: () => {
        this.formSubmitted.set(true);
        this.submitting.set(false);

        if (channel === 'whatsapp') {
          const msg = encodeURIComponent(`Olá! Meu nome é ${this.clientNome}. Gostaria de mais informações sobre o empreendimento ${emp?.nome || ''}. Previsão de compra: ${this.clientPrevisao}.`);
          window.open(`https://wa.me/5565999999999?text=${msg}`, '_blank');
        } else if (channel === 'phone') {
          window.location.href = 'tel:6533110000';
        }

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
    const doBanco = this.plantasDoBanco();
    if (!doBanco || doBanco.length === 0) {
      return [];
    }

    return doBanco
      .filter((p: any) => {
        const nome = (p.nome || '').toLowerCase();
        const tipo = (p.plantaTipo || '').toLowerCase();
        const isImplantacao = nome.includes('implantação') || nome.includes('implantacao') || tipo.includes('implantação') || tipo.includes('implantacao');
        return !isImplantacao;
      })
      .map((p: any) => ({
        id: p.id,
        nome: this.cleanPlantaTitle(p.nome),
        area: p.area || 0,
        quartos: p.quartos || 0,
        suites: p.suites || 0,
        banheiros: p.banheiros || 0,
        vagas: p.vagas || 0,
        plantaTipo: p.plantaTipo || 'Apartamento',
        observacoes: p.observacoes,
        imagemUrl: p.imagemUrl || '',
        images: p.images && p.images.length > 0 ? p.images : (p.imagemUrl ? [p.imagemUrl] : []),
        diferenciais: p.diferenciais || []
      }))
      .filter((p: any) => !!p.imagemUrl || p.area > 0 || !!p.nome);
  });

  protected lazerDaDatabase = computed(() => {
    const doBanco = this.lazerDoBanco();
    if (doBanco && doBanco.length > 0) {
      return doBanco;
    }
    return this.diferenciais();
  });

  protected rendaFamiliar = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'renda_familiar' || n === 'rendafamiliar';
    });
    if (item && (item.valor || item.Valor)) {
      const raw = String(item.valor || item.Valor).trim();
      if (raw && raw !== '0') {
        if (raw.startsWith('R$')) return raw;
        const num = parseFloat(raw.replace(/[^\d.,]/g, '').replace(',', '.'));
        if (!isNaN(num) && num > 0) {
          return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
        }
        return raw;
      }
    }
    const vIni = this.empreendimento()?.valorInicial;
    if (vIni && vIni > 0) {
      const calcRenda = Math.round(vIni * 0.01);
      return calcRenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    }
    return 'R$ 22.120';
  });

  protected previsaoCondominio = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'previsao_condominio' || n === 'previsaocondominio';
    });
    if (item && (item.valor || item.Valor)) {
      const raw = String(item.valor || item.Valor).trim();
      if (raw && raw !== '0') {
        if (raw.startsWith('R$')) return raw.includes('/mês') ? raw : `${raw}/mês`;
        const num = parseFloat(raw.replace(/[^\d.,]/g, '').replace(',', '.'));
        if (!isNaN(num) && num > 0) {
          const formatted = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
          return `${formatted}/mês`;
        }
        return raw.includes('/mês') ? raw : `${raw}/mês`;
      }
    }
    return 'R$ 1.250/mês';
  });

  protected subtipoDisplay = computed(() => {
    const emp = this.empreendimento();
    if (emp?.subtipo?.nome) return emp.subtipo.nome.toUpperCase();
    if (emp?.subtipo?.Nome) return emp.subtipo.Nome.toUpperCase();
    if (emp?.subtipoNome) return emp.subtipoNome.toUpperCase();
    if (emp?.subtipo_nome) return emp.subtipo_nome.toUpperCase();
    if (emp?.tipo === 'Horizontal' || emp?.tipo === 'Loteamento') return 'RESIDENCIAL';
    return 'APARTAMENTO';
  });

  protected variacaoDisplay = computed(() => {
    const emp = this.empreendimento();
    if (emp?.variacao?.nome) return emp.variacao.nome.toUpperCase();
    if (emp?.variacao?.Nome) return emp.variacao.Nome.toUpperCase();
    if (emp?.variacaoNome) return emp.variacaoNome.toUpperCase();
    if (emp?.variacao_nome) return emp.variacao_nome.toUpperCase();
    if (emp?.tipo === 'Horizontal' || emp?.tipo === 'Loteamento') return 'CASA';
    return 'PADRÃO';
  });

  protected linkTour = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'link_tour' || n === 'tour_virtual' || n === 'link_tour_virtual';
    });
    if (!item || (!item.valor && !item.Valor)) return null;
    const val = String(item.valor || item.Valor).trim();
    return val || null;
  });

  protected linkTourSafeUrl = computed((): SafeResourceUrl | null => {
    const url = this.linkTour();
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  protected areaTerrenoDisplay = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'area_total' || n === 'area_terreno' || n === 'areatotal' || n === 'areaterreno';
    });
    if (item && (item.valor || item.Valor)) {
      const raw = String(item.valor || item.Valor).trim();
      if (raw && raw !== '0') {
        if (raw.toLowerCase().includes('m²')) return raw;
        const num = parseFloat(raw.replace(/[^\d.,]/g, '').replace(',', '.'));
        if (!isNaN(num) && num > 0) {
          return `${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;
        }
        return `${raw} m²`;
      }
    }
    return this.areaTerreno();
  });

  protected metragensDisplay = computed(() => {
    const list = this.todasCaracteristicas();
    const minItem = list.find(x => (x.nome || x.Nome || '').toLowerCase() === 'area_unidade_min');
    const maxItem = list.find(x => (x.nome || x.Nome || '').toLowerCase() === 'area_unidade_max');
    const minVal = minItem ? String(minItem.valor || minItem.Valor || '').trim() : '';
    const maxVal = maxItem ? String(maxItem.valor || maxItem.Valor || '').trim() : '';

    if (minVal && maxVal && minVal !== '0' && maxVal !== '0') {
      const minClean = minVal.replace(/m²/gi, '').trim();
      const maxClean = maxVal.replace(/m²/gi, '').trim();
      return `${minClean} a ${maxClean} m²`;
    } else if (minVal && minVal !== '0') {
      return minVal.toLowerCase().includes('m²') ? minVal : `${minVal} m²`;
    } else if (maxVal && maxVal !== '0') {
      return maxVal.toLowerCase().includes('m²') ? maxVal : `${maxVal} m²`;
    }

    return this.metragens();
  });

  protected areaVerdeDisplay = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => (x.nome || x.Nome || '').toLowerCase() === 'area_verde');
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0') return null;
    if (raw.toLowerCase() === 'sim' || raw.toLowerCase() === 's') return 'Incluso no projeto';
    if (!isNaN(Number(raw)) && !raw.toLowerCase().includes('m²')) return `${raw} m²`;
    return raw;
  });

  protected areaPreservacaoDisplay = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => (x.nome || x.Nome || '').toLowerCase() === 'area_preservacao');
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0') return null;
    if (raw.toLowerCase() === 'sim' || raw.toLowerCase() === 's') return 'Incluso no projeto';
    if (!isNaN(Number(raw)) && !raw.toLowerCase().includes('m²')) return `${raw} m²`;
    return raw;
  });

  protected isHorizontal = computed(() => {
    const t = (this.empreendimento()?.tipo || '').toLowerCase();
    const st = (this.subtipoDisplay() || '').toLowerCase();
    return t.includes('horizontal') || t.includes('loteamento') || st.includes('condomínio') || st.includes('condominio') || st.includes('loteamento') || st.includes('lote');
  });

  protected isVertical = computed(() => {
    return !this.isHorizontal();
  });

  protected pavimentosDisplay = computed(() => {
    if (this.isHorizontal()) return null;
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'numero_pavimentos' || n === 'pavimentos' || n === 'qtd_pavimentos';
    });
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0') return null;
    return raw;
  });

  protected unidadesPorAndarDisplay = computed(() => {
    if (this.isHorizontal()) return null;
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'unidades_por_andar' || n === 'unidades_andar' || n === 'total_unidades_andar';
    });
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0') return null;
    return raw;
  });

  protected elevadoresDisplay = computed(() => {
    if (this.isHorizontal()) return null;
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'elevadores' || n === 'qtd_elevadores' || n === 'elevador';
    });
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0') return null;
    return raw;
  });

  protected bicicletarioDisplay = computed(() => {
    const list = this.todasCaracteristicas();
    const item = list.find(x => {
      const n = (x.nome || x.Nome || '').toLowerCase();
      return n === 'bicicletario' || n === 'bicicletário';
    });
    if (!item || (!item.valor && !item.Valor)) return null;
    const raw = String(item.valor || item.Valor).trim();
    if (!raw || raw === '0' || raw.toLowerCase() === 'não' || raw.toLowerCase() === 'nao') return null;
    return raw.toLowerCase() === 'sim' || raw.toLowerCase() === 's' ? 'Sim' : raw;
  });

  protected diferenciaisDaDatabase = computed(() => {
    const doBanco = this.diferenciaisDoBanco();
    const baseList = (doBanco && doBanco.length > 0) ? doBanco : this.diferenciais();

    const excludedKeys = [
      'previsao_condominio',
      'renda_familiar',
      'link_tour',
      'planta_principal',
      'mostra_mapa',
      'disponibilidade_mapa',
      'instagram_empreendimento',
      'facebook_empreendimento',
      'youtube_empreendimento',
      'ocultar_valor',
      'video'
    ];

    return baseList.filter(item => {
      const t = (item.titulo || item.nome || item.Nome || '').toLowerCase().trim();
      if (excludedKeys.includes(t)) return false;
      if (t.startsWith('area_')) return false;
      if (t.startsWith('qtd_') || t.startsWith('tam_') || t.startsWith('minimo_') || t.startsWith('maximo_') || t.startsWith('estacionamento_') || t.startsWith('mostra_') || t.startsWith('disponibilidade_') || t.startsWith('instagram_') || t.startsWith('facebook_') || t.startsWith('youtube_')) return false;
      return true;
    });
  });

  protected estagioObra = computed(() => {
    const emp = this.empreendimento();
    const status = (emp?.status || emp?.previsaoEntrega || 'Lançamento').toLowerCase();
    
    // Default 6 stages matching Image 2:
    // Lançamento, Fundação, Estrutura, Alvenaria, Acabamentos, Entrega
    const stages = [
      { key: 'lancamento', label: 'Lançamento', date: 'Mai/2024', icon: 'crane' },
      { key: 'fundacao', label: 'Fundação', date: 'Jul/2024', icon: 'foundation' },
      { key: 'estrutura', label: 'Estrutura', date: 'Out/2024', icon: 'structure' },
      { key: 'alvenaria', label: 'Alvenaria', date: 'Jan/2025', icon: 'masonry' },
      { key: 'acabamentos', label: 'Acabamentos', date: 'Mai/2025', icon: 'finishing' },
      { key: 'entrega', label: 'Entrega', date: emp?.previsaoEntrega || 'Set/2025', icon: 'key' }
    ];

    let currentIdx = 0; // Default: Lançamento
    if (status.includes('fund') || status.includes('infra')) currentIdx = 1;
    else if (status.includes('estrut')) currentIdx = 2;
    else if (status.includes('alven') || status.includes('obra')) currentIdx = 3;
    else if (status.includes('acab') || status.includes('final')) currentIdx = 4;
    else if (status.includes('entreg') || status.includes('pronto')) currentIdx = 5;

    return stages.map((s, idx) => ({
      ...s,
      isCurrent: idx === currentIdx,
      isCompleted: idx < currentIdx
    }));
  });

  protected openEstagioObraFotos() {
    const hasEstagioPhotos = this.categorizedPhotos().some(p => p.tipo.toLowerCase().includes('obra') || p.tipo.toLowerCase().includes('estágio'));
    if (hasEstagioPhotos) {
      const matchType = this.categorizedPhotos().find(p => p.tipo.toLowerCase().includes('obra') || p.tipo.toLowerCase().includes('estágio'))?.tipo;
      if (matchType) {
        this.activePhotoFilter.set(matchType);
      }
    }
    const element = document.getElementById('section-fotos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (this.galleryImages().length > 0) {
      this.openLightboxForGallery(0);
    }
  }

  public selectedPlantaModal = signal<any | null>(null);
  public selectedPlantaImageIndex = signal<number>(0);

  public openPlantaModal(planta: any) {
    const plantaImages = planta.images && planta.images.length > 0 
      ? planta.images 
      : (planta.imagemUrl ? [planta.imagemUrl] : []);
    
    this.selectedPlantaModal.set({
      ...planta,
      images: plantaImages,
      cleanNome: this.cleanPlantaTitle(planta.nome)
    });
    this.selectedPlantaImageIndex.set(0);
  }

  public closePlantaModal() {
    this.selectedPlantaModal.set(null);
  }

  public cleanPlantaTitle(nome: string): string {
    if (!nome) return 'Planta';
    let clean = nome.replace(/INSERT INTO[\s\S]*/gi, '').trim();
    return clean || 'Planta';
  }

  protected getPlantaCategory(planta: any): string {
    const nome = (planta?.nome || '').toLowerCase();
    const tipo = (planta?.plantaTipo || '').toLowerCase();
    if (nome.includes('implantação') || nome.includes('implantacao') || tipo.includes('implantação') || tipo.includes('implantacao')) {
      return 'Implantação Geral';
    }
    if (nome.includes('cobertura') || tipo.includes('cobertura')) {
      return 'Cobertura';
    }
    if (nome.includes('duplex') || tipo.includes('duplex')) {
      return 'Duplex';
    }
    return planta?.plantaTipo || 'Apartamento';
  }

  protected getPlantaLabel(nome: string, index: number): string {
    if (!nome) return `PLANTA ${index + 1}`;
    let clean = this.cleanPlantaTitle(nome).toUpperCase();
    if (clean.includes('IMPLANTAÇÃO') || clean.includes('IMPLANTACAO')) {
      return 'IMPLANTAÇÃO GERAL';
    }
    if (!clean.startsWith('PLANTA') && !clean.startsWith('TIPO')) {
      clean = 'PLANTA ' + clean;
    }
    return clean;
  }

  protected getActivePhotoIndex(imageUrl: string): number {
    const idx = this.galleryImages().indexOf(imageUrl);
    return idx >= 0 ? idx : 0;
  }
}

