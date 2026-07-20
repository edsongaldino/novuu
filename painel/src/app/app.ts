import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { LeadService, Lead } from './core/services/lead.service';
import { ConstrutoraService, Construtora } from './core/services/construtora.service';
import { EmpreendimentoService, Empreendimento } from './core/services/empreendimento.service';
import { CidadeService, Cidade, Bairro } from './core/services/cidade.service';
import { PropostaService, PropostaBalao, CreatePropostaRequest } from './core/services/proposta.service';
import { DatePipe, DecimalPipe } from '@angular/common';

export interface Planta {
  id?: number;
  nome: string;
  area: number;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  imageUrl: string;
  tags: string[];
}

export interface Torre {
  id: number;
  nome: string;
  andares: number;
  unidadesPorAndar: number;
}

export interface Unidade {
  id: number;
  numero: string;
  torreId: number;
  torreNome: string;
  andar: number;
  posicao: number;
  plantaNome: string;
  status: 'Disponível' | 'Bloqueado' | 'Reservado';
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Painel Administrativo - Lançamentos Online';
  protected readonly setTimeout = setTimeout;
  protected readonly document = document;
  
  protected authService = inject(AuthService);
  private leadService = inject(LeadService);
  private construtoraService = inject(ConstrutoraService);
  private empreendimentoService = inject(EmpreendimentoService);
  private cidadeService = inject(CidadeService);
  private propostaService = inject(PropostaService);

  protected activeTab = 'dashboard';
  
  protected loginEmail = 'admin@lancamentos.online';
  protected loginPassword = 'admin123';

  protected stats = signal({
    totalLeads: 0,
    leadsTrend: '0',
    activeProposals: 0,
    proposalsTrend: '0',
    totalProperties: 3,
    conversionRate: '0%',
    conversionTrend: '+0.0%'
  });

  protected leads = signal<Lead[]>([]);
  protected construtoras = signal<Construtora[]>([]);
  protected empreendimentos = signal<Empreendimento[]>([]);
  protected selectedEmpreendimento = signal<Empreendimento | null>(null);
  protected subEditTab = signal<string | null>(null);
  protected sidebarCollapsed = signal(false);

  // Photo upload state
  protected fotoPreviews = signal<{ name: string; url: string; file?: File; uploading?: boolean; uploaded?: boolean }[]>([]);
  protected fotoDragOver = signal(false);

  // ─ Plantas ──────────────────────────────────────────────────
  protected plantasList = signal<Planta[]>([
    {
      id: 1, nome: 'Planta Premium Duplex', area: 185,
      quartos: 3, suites: 3, banheiros: 4, vagas: 2,
      descricao: 'Planta ampla com acabamento premium, varanda gourmet e vista panorâmica.',
      imageUrl: '', tags: ['Varanda Gourmet', 'Closet Master', 'DCE']
    }
  ]);
  protected plantaFormOpen = signal(false);
  protected plantaEditIndex = signal<number | null>(null);
  protected plantaForm = signal<Planta>(this.emptyPlanta());
  protected plantaImagePreview = signal<string | null>(null);

  private emptyPlanta(): Planta {
    return { nome: '', area: 0, quartos: 2, suites: 1, banheiros: 2, vagas: 1, descricao: '', imageUrl: '', tags: [] };
  }

  protected openNewPlanta() {
    this.plantaForm.set(this.emptyPlanta());
    this.plantaImagePreview.set(null);
    this.plantaEditIndex.set(null);
    this.plantaFormOpen.set(true);
  }

  protected openEditPlanta(index: number) {
    const p = this.plantasList()[index];
    this.plantaForm.set({ ...p, tags: [...p.tags] });
    this.plantaImagePreview.set(p.imageUrl || null);
    this.plantaEditIndex.set(index);
    this.plantaFormOpen.set(true);
  }

  protected closePlantaForm() {
    this.plantaFormOpen.set(false);
  }

  protected savePlanta() {
    const p = this.plantaForm();
    if (!p.nome || !p.area) { alert('Preencha o nome e a área da planta.'); return; }
    const idx = this.plantaEditIndex();
    if (idx !== null) {
      this.plantasList.update(list => list.map((item, i) => i === idx ? { ...p } : item));
    } else {
      this.plantasList.update(list => [...list, { ...p, id: Date.now() }]);
    }
    this.plantaFormOpen.set(false);
  }

  protected removePlanta(index: number) {
    if (!confirm('Remover esta planta?')) return;
    this.plantasList.update(list => list.filter((_, i) => i !== index));
  }

  protected onPlantaImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      this.plantaImagePreview.set(url);
      this.plantaForm.update(f => ({ ...f, imageUrl: url }));
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  protected updatePlantaField(field: keyof Planta, value: any) {
    this.plantaForm.update(f => ({ ...f, [field]: value }));
  }

  // Tag input for planta characteristics
  protected plantaTagInput = '';
  protected readonly plantaTagSuggestions = [
    'Varanda Gourmet', 'Closet Master', 'DCE', 'Lavabo', 'Sala de TV',
    'Cozinha Americana', 'Copa', 'Despensa', 'Home Office', 'Sala de Jantar',
    'Área de Serviço', 'Terraço', 'Piscina Privativa', 'Sacada', 'Bay Window',
    'Pé Direito Duplo', 'Mezanino', 'Jardim de Inverno', 'Banheira'
  ];
  protected plantaTagOpen = signal(false);

  protected selectPlantaTag(value: string) {
    const v = value.trim();
    if (!v) return;
    this.plantaForm.update(f => ({
      ...f,
      tags: f.tags.includes(v) ? f.tags : [...f.tags, v]
    }));
    this.plantaTagInput = '';
    this.plantaTagOpen.set(false);
  }

  protected removePlantaTag(tag: string) {
    this.plantaForm.update(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  }

  protected onPlantaTagKeydown(event: KeyboardEvent, inputEl: HTMLInputElement) {
    const q = inputEl.value.trim();
    if ((event.key === 'Enter' || event.key === ',') && q) {
      event.preventDefault();
      this.selectPlantaTag(q);
    }
    if (event.key === 'Escape') this.plantaTagOpen.set(false);
  }

  protected closePlantaTagDropdown() {
    window.setTimeout(() => this.plantaTagOpen.set(false), 150);
  }

  // ─── Torres ────────────────────────────────────────────────────────────────

  protected torresList = signal<Torre[]>([
    { id: 1, nome: 'Torre das Palmeiras', andares: 10, unidadesPorAndar: 4 }
  ]);

  // Torres form
  protected torreFormNome    = '';
  protected torreFormAndares = 10;
  protected torreFormUnidades = 4;

  protected addTorre() {
    const nome = this.torreFormNome.trim();
    if (!nome) { alert('Informe o nome da torre/quadra.'); return; }
    this.torresList.update(list => [
      ...list,
      { id: Date.now(), nome, andares: this.torreFormAndares, unidadesPorAndar: this.torreFormUnidades }
    ]);
    this.torreFormNome = '';
    this.torreFormAndares = 10;
    this.torreFormUnidades = 4;
  }

  protected removeTorre(id: number) {
    if (!confirm('Remover esta torre/quadra? As unidades geradas para ela também serão removidas.')) return;
    this.torresList.update(list => list.filter(t => t.id !== id));
    this.unidadesList.update(list => list.filter(u => u.torreId !== id));
  }

  // ─── Unidades ──────────────────────────────────────────────────────────────

  protected unidadesList = signal<Unidade[]>([]);
  protected unidadesViewMode = signal<'group' | 'flat'>('group');
  protected unidadesExpandedTorre = signal<number | null>(null);

  // Planta padrão para novas unidades (selecionável)
  protected defaultPlantaId = signal<number | null>(null);

  protected gerarUnidadesEmLote() {
    const torres = this.torresList();
    if (torres.length === 0) {
      alert('Cadastre pelo menos uma torre/quadra antes de gerar unidades.');
      return;
    }
    const isHorizontal = this.selectedEmpreendimento()?.tipo === 'Horizontal';
    const novas: Unidade[] = [];

    for (const torre of torres) {
      const jaExistentes = this.unidadesList().filter(u => u.torreId === torre.id);
      if (jaExistentes.length > 0 &&
        !confirm(`A torre "${torre.nome}" já possui ${jaExistentes.length} unidade(s). Deseja REGERAR e substituí-las?`)) {
        continue;
      }
      // Remove existing for this tower and regenerate
      this.unidadesList.update(list => list.filter(u => u.torreId !== torre.id));

      for (let andar = 1; andar <= torre.andares; andar++) {
        for (let pos = 1; pos <= torre.unidadesPorAndar; pos++) {
          const numero = isHorizontal
            ? `Lote ${String((andar - 1) * torre.unidadesPorAndar + pos).padStart(2, '0')}`
            : `Apt ${andar}${String(pos).padStart(2, '0')}`;
          novas.push({
            id: Date.now() + Math.random(),
            numero,
            torreId: torre.id,
            torreNome: torre.nome,
            andar,
            posicao: pos,
            plantaNome: this.defaultPlantaId() != null
              ? this.plantasList().find(p => p.id === this.defaultPlantaId())?.nome ?? ''
              : (this.plantasList()[0]?.nome ?? ''),
            status: 'Disponível'
          });
        }
      }
    }
    this.unidadesList.update(list => [...list, ...novas]);
    // auto-expand first tower
    if (torres.length > 0) this.unidadesExpandedTorre.set(torres[0].id);
  }

  protected toggleUnidadeStatus(id: number) {
    this.unidadesList.update(list => list.map(u => {
      if (u.id !== id) return u;
      const cycle: Unidade['status'][] = ['Disponível', 'Bloqueado', 'Reservado'];
      const idx = cycle.indexOf(u.status);
      return { ...u, status: cycle[(idx + 1) % cycle.length] };
    }));
  }

  protected getUnidadesForTorre(torreId: number): Unidade[] {
    return this.unidadesList().filter(u => u.torreId === torreId);
  }

  protected getUnidadesByAndar(torreId: number): Map<number, Unidade[]> {
    const map = new Map<number, Unidade[]>();
    for (const u of this.getUnidadesForTorre(torreId)) {
      const arr = map.get(u.andar) ?? [];
      arr.push(u);
      map.set(u.andar, arr);
    }
    return map;
  }

  protected getTorreAndarEntries(torreId: number): { andar: number; unidades: Unidade[] }[] {
    const map = this.getUnidadesByAndar(torreId);
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0]) // top floor first
      .map(([andar, unidades]) => ({ andar, unidades }));
  }

  protected toggleTorreExpand(torreId: number) {
    this.unidadesExpandedTorre.set(this.unidadesExpandedTorre() === torreId ? null : torreId);
  }

  protected countStatus(units: Unidade[], status: Unidade['status']): number {
    return units.filter(u => u.status === status).length;
  }

  protected countTotalUnidades(): number {
    return this.torresList().reduce((acc, t) => acc + t.andares * t.unidadesPorAndar, 0);
  }

  protected cidadesList = signal<Cidade[]>([]);

  protected bairrosList = signal<Bairro[]>([]);

  // Form fields for new Construtora
  protected newNome = '';
  protected newNomeAbreviado = '';
  protected newCnpj = '';
  protected newAcessoDomus = false;

  // Form fields for Cidade/Bairro
  protected newCidadeNome = '';
  protected newBairroNome = '';
  protected newBairroCidadeId = 0;

  // Form fields for Proposta / Negociar
  protected pClienteNome = '';
  protected pClienteCpf = '';
  protected pClienteEmail = '';
  protected pClienteTelefone = '';
  protected pClienteNascimento = '';
  protected pClienteEstadoCivil = 'Casado';
  protected pEmpreendimentoId = 0;
  protected pUnidadeId = 1; // default to first available unit ID
  protected pValorTotal = 750000;
  protected pValorEntrada = 150000;
  protected pParcelasQtde = 36;
  protected pParcelasValor = 10000;
  protected pValorBens = 0;
  protected pBaloesList = signal<PropostaBalao[]>([]);
  protected pNovoBalaoValor = 50000;
  protected pNovoBalaoData = '2027-12-15';

  // Dropdown menus expansion states
  protected adminExpanded = signal(false);
  protected comercialExpanded = signal(false);
  protected integracoesExpanded = signal(false);
  protected financeiroExpanded = signal(false);
  protected usuariosExpanded = signal(false);

  // Accordion active index
  protected activeAccordion = signal<string | null>('info');

  constructor() {
    effect(() => {
      const loggedIn = this.authService.isLoggedIn();
      const cid = this.authService.construtoraId();
      
      if (loggedIn) {
        if (cid !== null) {
          this.loadLeads(cid);
        }
        this.loadConstrutoras();
        this.loadEmpreendimentos();
        this.loadCidades();
        this.loadBairros();
      }
    });
  }

  private loadLeads(construtoraId: number) {
    this.leadService.getLeadsByConstrutora(construtoraId).subscribe({
      next: (data) => {
        this.leads.set(data);
        
        // Calculate dynamic stats
        const total = data.length;
        const proposals = data.filter(l => l.status.toLowerCase().includes('proposta') || l.status.toLowerCase().includes('análise')).length;
        
        this.stats.set({
          totalLeads: total,
          leadsTrend: total > 0 ? `+${total}` : '0',
          activeProposals: proposals,
          proposalsTrend: proposals > 0 ? `+${proposals}` : '0',
          totalProperties: 3,
          conversionRate: total > 0 ? `${((proposals / total) * 100).toFixed(1)}%` : '0%',
          conversionTrend: '+1.5%'
        });
      },
      error: (err) => console.error('Erro ao buscar leads:', err)
    });
  }

  protected loadConstrutoras() {
    this.construtoraService.getConstrutoras().subscribe({
      next: (data) => this.construtoras.set(data),
      error: (err) => console.error('Erro ao buscar construtoras:', err)
    });
  }

  protected loadEmpreendimentos() {
    this.empreendimentoService.getEmpreendimentos().subscribe({
      next: (data) => {
        this.empreendimentos.set(data);
        this.stats.update(s => ({ ...s, totalProperties: data.length }));
      },
      error: (err) => console.error('Erro ao buscar empreendimentos:', err)
    });
  }

  protected loadCidades() {
    this.cidadeService.getCidades().subscribe({
      next: (data) => {
        this.cidadesList.set(data);
        if (data.length > 0) {
          this.newBairroCidadeId = data[0].id || 0;
        }
      },
      error: (err) => console.error('Erro ao buscar cidades:', err)
    });
  }

  protected loadBairros() {
    this.cidadeService.getBairros().subscribe({
      next: (data) => this.bairrosList.set(data),
      error: (err) => console.error('Erro ao buscar bairros:', err)
    });
  }

  protected login() {
    if (!this.loginEmail || !this.loginPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res) => {
        console.log('Login efetuado com sucesso:', res.userName);
      },
      error: (err) => {
        console.error('Erro ao efetuar login:', err);
        alert('Credenciais inválidas. Use admin@lancamentos.online e admin123');
      }
    });
  }

  protected logout() {
    this.authService.logout();
    this.activeTab = 'dashboard';
    this.selectedEmpreendimento.set(null);
    this.adminExpanded.set(false);
    this.comercialExpanded.set(false);
    this.integracoesExpanded.set(false);
    this.financeiroExpanded.set(false);
    this.usuariosExpanded.set(false);
  }

  protected onConstrutoraChange(idStr: string) {
    const cid = parseInt(idStr, 10);
    this.authService.construtoraId.set(cid);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_construtora_id', cid.toString());
    }
    // Typecast to any to bypass private accessor restriction for this simple internal call
    (this as any).loadLeads(cid);
  }

  protected setTab(tab: string) {
    this.activeTab = tab;
    if (tab !== 'empreendimentos') {
      this.selectedEmpreendimento.set(null);
    }
  }

  protected toggleAdmin() {
    this.adminExpanded.set(!this.adminExpanded());
  }

  protected toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  protected toggleComercial() {
    this.comercialExpanded.set(!this.comercialExpanded());
  }

  protected toggleIntegracoes() {
    this.integracoesExpanded.set(!this.integracoesExpanded());
  }

  protected toggleFinanceiro() {
    this.financeiroExpanded.set(!this.financeiroExpanded());
  }

  protected toggleUsuarios() {
    this.usuariosExpanded.set(!this.usuariosExpanded());
  }

  protected createConstrutora() {
    if (!this.newNome || !this.newNomeAbreviado || !this.newCnpj) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const payload: Construtora = {
      nome: this.newNome,
      nomeAbreviado: this.newNomeAbreviado,
      cnpj: this.newCnpj,
      acessoDomus: this.newAcessoDomus
    };

    this.construtoraService.createConstrutora(payload).subscribe({
      next: (res) => {
        alert('Construtora cadastrada com sucesso!');
        this.construtoras.update(list => [...list, res]);
        this.newNome = '';
        this.newNomeAbreviado = '';
        this.newCnpj = '';
        this.newAcessoDomus = false;
      },
      error: (err) => {
        console.error('Erro ao cadastrar construtora:', err);
        alert('Erro ao cadastrar construtora. Verifique os dados e tente novamente.');
      }
    });
  }

  protected createCidade() {
    if (!this.newCidadeNome) {
      alert('Por favor, digite o nome da cidade.');
      return;
    }

    this.cidadeService.createCidade({ nome: this.newCidadeNome }).subscribe({
      next: (res) => {
        alert('Cidade cadastrada com sucesso!');
        this.cidadesList.update(list => [...list, res]);
        this.newCidadeNome = '';
      },
      error: (err) => console.error('Erro ao cadastrar cidade:', err)
    });
  }

  protected createBairro() {
    if (!this.newBairroNome || !this.newBairroCidadeId) {
      alert('Preencha o nome do bairro e selecione uma cidade.');
      return;
    }

    this.cidadeService.createBairro({ nome: this.newBairroNome, cidadeId: this.newBairroCidadeId }).subscribe({
      next: (res) => {
        alert('Bairro cadastrado com sucesso!');
        this.bairrosList.update(list => [...list, res]);
        this.newBairroNome = '';
      },
      error: (err) => console.error('Erro ao cadastrar bairro:', err)
    });
  }

  // Proposta balloon payment list management
  protected addBalao() {
    if (!this.pNovoBalaoValor || !this.pNovoBalaoData) {
      alert('Preencha o valor e a data do pagamento balão.');
      return;
    }

    this.pBaloesList.update(list => [...list, {
      valor: this.pNovoBalaoValor,
      data: this.pNovoBalaoData
    }]);
  }

  protected removeBalao(index: number) {
    this.pBaloesList.update(list => list.filter((_, idx) => idx !== index));
  }

  protected submitProposta() {
    if (!this.pClienteNome || !this.pClienteCpf) {
      alert('Por favor, preencha o nome e CPF do cliente.');
      return;
    }

    const request: CreatePropostaRequest = {
      unidadeId: this.pUnidadeId,
      cliente: {
        nome: this.pClienteNome,
        cpf: this.pClienteCpf,
        email: this.pClienteEmail || undefined,
        telefone: this.pClienteTelefone || undefined,
        dataNascimento: this.pClienteNascimento || undefined,
        estadoCivil: this.pClienteEstadoCivil
      },
      valorProposta: this.pValorTotal,
      entradaProposta: this.pValorEntrada,
      quantidadeParcela: this.pParcelasQtde || undefined,
      valorParcela: this.pParcelasValor || undefined,
      valorBens: this.pValorBens || undefined,
      baloes: this.pBaloesList().length > 0 ? this.pBaloesList() : undefined
    };

    this.propostaService.createProposta(request).subscribe({
      next: (res) => {
        alert('Proposta comercial enviada com sucesso para análise!');
        // Reset proposta form
        this.pClienteNome = '';
        this.pClienteCpf = '';
        this.pClienteEmail = '';
        this.pClienteTelefone = '';
        this.pClienteNascimento = '';
        this.pBaloesList.set([]);
      },
      error: (err) => {
        console.error('Erro ao enviar proposta:', err);
        alert('Erro ao enviar proposta: ' + (err.error?.message || err.message));
      }
    });
  }

  // Empreendimento management methods
  protected selectEmpreendimento(emp: Empreendimento) {
    this.selectedEmpreendimento.set({ ...emp });
    this.activeAccordion.set('info');
  }

  protected startNewEmpreendimento() {
    this.selectedEmpreendimento.set({
      nome: '',
      descricao: '',
      tipo: 'Vertical',
      valorInicial: 0,
      valorFinal: 0,
      previsaoEntrega: '',
      qtdeTorre: 1,
      qtdeQuadra: 0,
      status: 'Liberado',
      logomarca: '',
      latitude: undefined,
      longitude: undefined
    });
    this.activeAccordion.set('info');
  }

  protected onXmlFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.empreendimentoService.importXml(file).subscribe({
      next: (res) => {
        alert('Empreendimento importado com sucesso via XML!');
        this.empreendimentos.update(list => [res, ...list]);
        event.target.value = '';
      },
      error: (err) => {
        console.error('Erro ao importar XML:', err);
        alert('Erro ao processar arquivo XML. Certifique-se de que ele segue o formato do modelo.');
        event.target.value = '';
      }
    });
  }

  protected cancelEdit() {
    this.selectedEmpreendimento.set(null);
    this.subEditTab.set(null);
  }

  // ─── Tag Input System ──────────────────────────────────────────────────

  // Preset suggestion pools
  protected readonly lazerSuggestions = [
    'Piscina Adulto/Infantil', 'Academia Equipada', 'Salão de Festas', 'Espaço Gourmet',
    'Quadra de Tênis', 'Playground', 'Churrasqueira', 'Sauna', 'Spa', 'Quadra Poliesportiva',
    'Campo de Futebol', 'Brinquedoteca', 'Petshop', 'Bike Sharing', 'Sala de Jogos',
    'Cinema Privativo', 'Coworking', 'Lounge', 'Rooftop', 'Trilha Ecológica',
    'Horta Comunitária', 'Espaço Zen / Meditação', 'Pet Place', 'Bicicletário',
    'Pista de Cooper', 'Espaço Fitness Externo', 'Piscina Aquecida'
  ];

  protected readonly canaisSuggestions = [
    'WhatsApp Vendas', 'E-mail Comercial', 'Telefone Fixo', 'Instagram', 'Facebook',
    'Site Próprio', 'Portal Imobiliário', 'YouTube', 'LinkedIn', 'TikTok',
    'Stand de Vendas', 'Atendimento 24h', 'Chat Online', 'Telegram'
  ];

  protected readonly caracteristicasSuggestions = [
    'Portaria 24 horas', 'Elevador de Serviço', 'Sistema de Segurança',
    'Vagas para Visitantes', 'Gerador de Energia', 'Energia Solar',
    'Coleta Seletiva', 'Acessibilidade PNE', 'Câmeras de Segurança',
    'Controle de Acesso Facial', 'Concierge', 'Fibra Óptica',
    'Smart Home', 'Medição Individualizada', 'Reúso de Água Pluvial',
    'Jardim Vertical', 'Cobertura Verde', 'Tomada para Carros Elétricos'
  ];

  // Tag arrays (chips selected)
  protected lazerTags    = signal<string[]>(['Piscina Adulto/Infantil', 'Academia Equipada', 'Salão de Festas', 'Espaço Gourmet', 'Playground']);
  protected canaisTags   = signal<string[]>([]);
  protected caracteristicasTags = signal<string[]>(['Portaria 24 horas', 'Elevador de Serviço', 'Sistema de Segurança']);

  // Input text for each field
  protected lazerInput    = '';
  protected canaisInput   = '';
  protected caracteristicasInput = '';

  // Dropdown visibility
  protected lazerOpen    = signal(false);
  protected canaisOpen   = signal(false);
  protected caracteristicasOpen = signal(false);

  protected getFilteredSuggestions(pool: string[], query: string, selected: string[]): string[] {
    const q = query.toLowerCase();
    return pool.filter(s => !selected.includes(s) && (q === '' || s.toLowerCase().includes(q))).slice(0, 8);
  }

  protected addTag(signal: ReturnType<typeof this.signal_lazer>, value: string) { }

  // Specific helpers for each field
  protected onTagInputEvent(field: 'lazer' | 'canais' | 'caracteristicas', query: string) {
    if (field === 'lazer')            { this.lazerInput = query;            this.lazerOpen.set(true); }
    if (field === 'canais')           { this.canaisInput = query;           this.canaisOpen.set(true); }
    if (field === 'caracteristicas')  { this.caracteristicasInput = query;  this.caracteristicasOpen.set(true); }
  }

  protected selectTag(field: 'lazer' | 'canais' | 'caracteristicas', value: string) {
    const v = value.trim();
    if (!v) return;
    if (field === 'lazer') {
      if (!this.lazerTags().includes(v)) this.lazerTags.update(t => [...t, v]);
      this.lazerInput = ''; this.lazerOpen.set(false);
    } else if (field === 'canais') {
      if (!this.canaisTags().includes(v)) this.canaisTags.update(t => [...t, v]);
      this.canaisInput = ''; this.canaisOpen.set(false);
    } else {
      if (!this.caracteristicasTags().includes(v)) this.caracteristicasTags.update(t => [...t, v]);
      this.caracteristicasInput = ''; this.caracteristicasOpen.set(false);
    }
  }

  protected removeTag(field: 'lazer' | 'canais' | 'caracteristicas', value: string) {
    if (field === 'lazer') this.lazerTags.update(t => t.filter(x => x !== value));
    else if (field === 'canais') this.canaisTags.update(t => t.filter(x => x !== value));
    else this.caracteristicasTags.update(t => t.filter(x => x !== value));
  }

  protected onTagKeydown(field: 'lazer' | 'canais' | 'caracteristicas', event: KeyboardEvent, inputEl: HTMLInputElement) {
    const query = inputEl.value.trim();
    if ((event.key === 'Enter' || event.key === ',') && query) {
      event.preventDefault();
      this.selectTag(field, query);
    }
    if (event.key === 'Escape') {
      if (field === 'lazer') this.lazerOpen.set(false);
      else if (field === 'canais') this.canaisOpen.set(false);
      else this.caracteristicasOpen.set(false);
    }
  }

  protected closeTagDropdown(field: 'lazer' | 'canais' | 'caracteristicas') {
    // small delay so click on suggestion fires first
    setTimeout(() => {
      if (field === 'lazer') this.lazerOpen.set(false);
      else if (field === 'canais') this.canaisOpen.set(false);
      else this.caracteristicasOpen.set(false);
    }, 150);
  }

  // dummy getter to satisfy TS — not actually used at runtime
  private get signal_lazer() { return this.lazerTags; }

  protected setSubEditTab(tab: string | null) {
    this.subEditTab.set(tab);
  }

  protected toggleAccordion(section: string) {
    if (this.activeAccordion() === section) {
      this.activeAccordion.set(null);
    } else {
      this.activeAccordion.set(section);
    }
  }

  protected saveDomusConfig() {
    alert('Configurações salvas com sucesso!');
  }

  protected saveEmpreendimento() {
    const emp = this.selectedEmpreendimento();
    if (!emp) return;

    if (emp.id) {
      this.empreendimentoService.updateEmpreendimento(emp.id, emp).subscribe({
        next: (res) => {
          alert('Empreendimento atualizado com sucesso!');
          this.empreendimentos.update(list => list.map(item => item.id === res.id ? res : item));
          this.selectedEmpreendimento.set(null);
          this.subEditTab.set(null);
        },
        error: (err) => {
          console.error('Erro ao salvar empreendimento:', err);
          alert('Erro ao salvar as alterações do empreendimento.');
        }
      });
    } else {
      this.empreendimentoService.createEmpreendimento(emp).subscribe({
        next: (res) => {
          alert('Novo empreendimento cadastrado com sucesso!');
          this.empreendimentos.update(list => [res, ...list]);
          this.selectedEmpreendimento.set(null);
          this.subEditTab.set(null);
        },
        error: (err) => {
          console.error('Erro ao cadastrar empreendimento:', err);
          alert('Erro ao cadastrar novo empreendimento.');
        }
      });
    }
  }

  // ─── Photo upload handlers ─────────────────────────────────────────────

  protected onFotoDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fotoDragOver.set(true);
  }

  protected onFotoDragLeave(event: DragEvent) {
    event.preventDefault();
    this.fotoDragOver.set(false);
  }

  protected onFotoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fotoDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processPhotoFiles(Array.from(files));
    }
  }

  protected onFotoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processPhotoFiles(Array.from(input.files));
      input.value = '';
    }
  }

  private processPhotoFiles(files: File[]) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      if (!allowed.includes(file.type)) {
        alert(`Arquivo "${file.name}" não suportado. Use JPEG, PNG ou WebP.`);
        return;
      }
      if (file.size > maxSize) {
        alert(`Arquivo "${file.name}" excede 10MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        this.fotoPreviews.update(list => [
          ...list,
          { name: file.name, url, file, uploading: false, uploaded: false }
        ]);
        this.uploadFotoImediato(file, url);
      };
      reader.readAsDataURL(file);
    });
  }

  private uploadFotoImediato(file: File, localUrl: string) {
    const emp = this.selectedEmpreendimento();
    if (!emp?.id) {
      // Empreendimento still unsaved – keep photo in pending list only
      return;
    }

    // Mark as uploading
    this.fotoPreviews.update(list =>
      list.map(p => p.url === localUrl ? { ...p, uploading: true } : p)
    );

    this.empreendimentoService.uploadPhoto(emp.id, file).subscribe({
      next: (res) => {
        this.fotoPreviews.update(list =>
          list.map(p => p.url === localUrl ? { ...p, url: res.url, uploading: false, uploaded: true } : p)
        );
        // Update logomarca with last uploaded photo for the card preview
        this.selectedEmpreendimento.update(e => e ? { ...e, logomarca: res.url } : e);
      },
      error: (err) => {
        console.error('Erro ao fazer upload da foto:', err);
        this.fotoPreviews.update(list =>
          list.map(p => p.url === localUrl ? { ...p, uploading: false } : p)
        );
        alert(`Erro ao enviar foto "${file.name}". Verifique a conexão com a API.`);
      }
    });
  }

  protected removeFoto(index: number) {
    this.fotoPreviews.update(list => list.filter((_, i) => i !== index));
  }

  protected openFotoInput() {
    document.getElementById('fotoFileInput')?.click();
  }
}
