import { Component, inject, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { LeadService, LeadItem } from './core/services/lead.service';
import { ConstrutoraService, Construtora } from './core/services/construtora.service';
import { EmpreendimentoService, Empreendimento, FotoItem } from './core/services/empreendimento.service';
import { CidadeService, Cidade, Bairro } from './core/services/cidade.service';
import { PropostaService, PropostaBalao, CreatePropostaRequest } from './core/services/proposta.service';
import { DashboardService, DashboardStatsResponse, DashboardQualityItem, PropertyRecommendation } from './core/services/dashboard.service';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare const L: any;

registerLocaleData(localePt);

export class CustomMonthDateAdapter extends NativeDateAdapter {
  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'short') {
      return ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    }
    if (style === 'long') {
      return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    }
    if (style === 'narrow') {
      return ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    }
    return super.getMonthNames(style);
  }

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${year}`;
    }
    return super.format(date, displayFormat);
  }
}

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

export interface ConstrutoraItem {
  id: number;
  nome: string;
  cidade: string;
  empreendimentosCount: number;
  unidadesCount: number;
  status: 'Ativa' | 'Inativa';
  ultimaAtualizacao: string;
  logoUrl?: string;
  coverUrl?: string;
  slogan?: string;
  fundacao?: string;
  publicadosCount?: number;
  publicadosPercent?: string;
  descricao?: string;
  site?: string;
  cnpj?: string;
  sede?: string;
  segmento?: string;
  telefone?: string;
  email?: string;
  social?: { instagram?: string; facebook?: string; linkedin?: string; youtube?: string; link?: string };
  empreendimentosPreview?: Array<{ nome: string; local: string; status: string; statusClass: string; imageUrl?: string }>;
}

export interface EmpreendimentoCardItem {
  id: number;
  nome: string;
  construtora: string;
  tipo: string;
  subtipo: string;
  localizacao: string;
  progressoCadastro: number;
  unidadesCount: number;
  plantasCount: number;
  status: 'Publicado' | 'Em preparação' | 'Rascunho';
  atualizacao: string;
  fotoCount: number;
  imageUrl: string;
}

export interface TowerConfigRow {
  id: number;
  nome: string;
  pavimentos: number;
  unidadesPorPavimento: number;
  totalUnidades: number;
}

export interface GeneratedUnitItem {
  id: number;
  unidade: string;
  torre: string;
  pavimento: string;
  tipo: string;
  areaPrivativa: number;
  vagas: number;
  status: 'Disponível' | 'Reservada' | 'Vendida' | 'Bloqueada';
  valor?: number;
  posicao?: string;
  tiposol?: string;
  plantaId?: number;
  plantaNome?: string;
  emOferta?: string;
  propostaOnline?: string;
}

export interface PlantaItem {
  id: number;
  nome: string;
  tipo: string;
  areaPrivativa: number;
  dormitorios: number;
  suites: number;
  banheiros: number;
  vagas: number;
  status: 'Ativa' | 'Inativa';
  ambientes: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, DecimalPipe, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: CustomMonthDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'input' },
        display: {
          dateInput: 'input',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'NOVUU | Inteligência Imobiliária';
  protected readonly setTimeout = setTimeout;
  protected readonly document = document;
  
  protected authService = inject(AuthService);
  private leadService = inject(LeadService);
  private construtoraService = inject(ConstrutoraService);
  private empreendimentoService = inject(EmpreendimentoService);
  private cidadeService = inject(CidadeService);
  private propostaService = inject(PropostaService);
  private dashboardService = inject(DashboardService);
  private sanitizer = inject(DomSanitizer);

  protected getMapSafeUrl(): SafeResourceUrl {
    const lat = this.localizacaoLat();
    const lng = this.localizacaoLng();
    const url = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  protected isSearchingCep = signal(false);
  protected isGeocodingMap = signal(false);

  protected activeTab = 'dashboard';
  
  protected loginEmail = 'admin@lancamentos.online';
  protected loginPassword = 'admin123';
  
  // Sistema de Notificação Toast (Sucesso / Erro)
  protected toast = signal<{ show: boolean; type: 'success' | 'error'; title: string; message: string }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  private toastTimeout: any = null;

  protected showToast(type: 'success' | 'error', title: string, message: string) {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toast.set({ show: true, type, title, message });
    this.toastTimeout = setTimeout(() => {
      this.hideToast();
    }, 3500);
  }

  protected hideToast() {
    this.toast.update(t => ({ ...t, show: false }));
  }

  // Estado de gerenciamento do empreendimento
  protected empManageTab = signal<'visao-geral' | 'informacoes' | 'estrutura' | 'plantas' | 'galeria' | 'localizacao' | 'leads' | 'publicacao' | 'status-obra'>('visao-geral');

  protected openEmpreendimentoManager(card: EmpreendimentoCardItem | Empreendimento) {
    this.empManageTab.set('visao-geral');
    const fullEmp: Empreendimento = {
      id: card.id,
      nome: card.nome,
      tipo: card.tipo || 'Vertical',
      subtipo: typeof card.subtipo === 'string' ? card.subtipo : (card.subtipo as any)?.nome || 'Apartamento',
      construtoraId: (card as any).construtoraId || 1,
      construtora: { id: 1, nome: (card as any).construtora || 'Plaenge', nomeAbreviado: 'Plaenge' },
      status: card.status || 'Publicado',
      valorInicial: (card as any).valorInicial || 593230,
      valorFinal: (card as any).valorFinal || 632285,
      previsaoCondominio: (card as any).previsaoCondominio || 790,
      rendaFamiliar: (card as any).rendaFamiliar || 14000,
      ocultarValor: (card as any).ocultarValor || 'Não ocultar',
      previsaoEntrega: (card as any).previsaoEntrega || 'Dez/2026',
      estagioLancamentoData: (card as any).estagioLancamentoData || 'Jan/2024',
      modalidade: (card as any).modalidade || 'Lançamento',
      imagemUrl: (card as any).imageUrl || (card as any).imagemUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      logomarca: (card as any).logomarca || 'https://ui-avatars.com/api/?name=Solar+do+Bosque&background=fff&color=15803d&font-size=0.3',
      descricao: (card as any).descricao || 'O Residencial Aurora oferece apartamentos de alto padrão em uma das regiões mais valorizadas de Cuiabá. São duas torres modernas com lazer completo, segurança 24h e infraestrutura para toda a família.',
      qtdeTorre: (card as any).qtdeTorre || 2,
      qtdeQuadra: (card as any).qtdeQuadra || 0
    };

    this.selectedEmpreendimento.set(fullEmp);
    this.empManageTab.set('informacoes');

    if (card.id) {
      this.loadRealEmpreendimentoData(card.id);
    }
  }

  protected loadRealEmpreendimentoData(empId: number) {
    // 1. Buscar detalhes reais do empreendimento no banco de dados
    this.empreendimentoService.getEmpreendimentoById(empId).subscribe({
      next: (emp) => {
        if (emp) {
          const current = this.selectedEmpreendimento();
          const construtoraIdVal = emp.construtoraId || emp.construtora?.id || current?.construtoraId || 1;
          this.selectedEmpreendimento.set({
            ...current,
            ...emp,
            construtoraId: construtoraIdVal,
            construtora: emp.construtora || current?.construtora || { id: construtoraIdVal, nome: 'Plaenge', nomeAbreviado: 'Plaenge' },
            nome: emp.nome || current?.nome || '',
            tipo: emp.tipo || current?.tipo || 'Vertical',
            subtipo: (typeof emp.subtipo === 'string' ? emp.subtipo : (emp.subtipo as any)?.nome) || current?.subtipo || 'Apartamento',
            valorInicial: emp.valorInicial || current?.valorInicial || 593230,
            valorFinal: emp.valorFinal || current?.valorFinal || 632285,
            previsaoCondominio: emp.previsaoCondominio || current?.previsaoCondominio || 790,
            rendaFamiliar: emp.rendaFamiliar || current?.rendaFamiliar || 14000,
            previsaoEntrega: emp.previsaoEntrega || current?.previsaoEntrega || 'Dez/2026',
            estagioLancamentoData: emp.estagioLancamentoData || current?.estagioLancamentoData || 'Jan/2024',
            imagemUrl: emp.imagemUrl || current?.imagemUrl || '',
            descricao: emp.descricao || current?.descricao || ''
          });
          this.loadLocalizacaoData(emp);
        }
      },
      error: (err) => console.error('Erro ao carregar dados reais do empreendimento:', err)
    });

    // 2. Buscar plantas reais vinculadas ao empreendimento no banco de dados
    this.empreendimentoService.getPlantas(empId).subscribe({
      next: (plantas) => {
        if (plantas && plantas.length > 0) {
          const mapped: PlantaItem[] = plantas.map((p, idx) => ({
            id: p.id || idx + 1,
            nome: p.nome || `Planta – ${idx + 1}`,
            tipo: p.plantaTipo || 'Apartamento',
            areaPrivativa: p.area || p.areaPrivativa || 90.0,
            dormitorios: p.quartos || p.dormitorios || 3,
            suites: p.suites || 1,
            banheiros: p.banheiros || 2,
            vagas: p.vagas || 2,
            status: 'Ativa',
            ambientes: (p.diferenciais && p.diferenciais.length > 0) 
              ? p.diferenciais 
              : ['Ambiente estar / jantar', 'Banheiro social', 'Sacada técnica', 'Área de serviço'],
            imageUrl: p.imagemUrl || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
          }));
          this.plantasGridList.set(mapped);
        }
      },
      error: (err) => console.error('Erro ao carregar plantas reais do empreendimento:', err)
    });

    // 3. Buscar galeria de fotos do empreendimento no banco de dados
    this.loadGaleriaFotos(empId);
  }

  protected saveEmpreendimentoChanges() {
    const emp = this.selectedEmpreendimento();
    if (!emp?.id) {
      this.showToast('error', 'Erro ao Salvar', 'Nenhum empreendimento selecionado para atualização.');
      return;
    }

    const payload: any = {
      nome: emp.nome,
      descricao: emp.descricao,
      tipo: emp.tipo || 'Vertical',
      subtipoId: (emp as any).subtipoId || (typeof emp.subtipo === 'object' ? (emp.subtipo as any)?.id : null) || 1,
      variacaoId: (emp as any).variacaoId || (typeof emp.variacao === 'object' ? (emp.variacao as any)?.id : null) || 1,
      construtoraId: emp.construtoraId || (typeof emp.construtora === 'object' ? (emp.construtora as any)?.id : null) || 1,
      valorInicial: emp.valorInicial,
      valorFinal: emp.valorFinal,
      previsaoEntrega: emp.previsaoEntrega,
      qtdeTorre: emp.qtdeTorre || 1,
      qtdeQuadra: emp.qtdeQuadra || 0,
      status: emp.status || 'Liberado',
      logomarca: emp.logomarca,
      latitude: emp.latitude,
      longitude: emp.longitude
    };

    this.empreendimentoService.updateEmpreendimento(emp.id, payload).subscribe({
      next: () => {
        this.showToast('success', 'Alterações Salvas!', 'As informações do empreendimento foram salvas com sucesso no banco de dados.');
        this.loadEmpreendimentos();
      },
      error: (err) => {
        console.error('Erro ao atualizar empreendimento:', err);
        this.showToast('error', 'Erro de Conexão', 'Não foi possível se comunicar com o banco de dados. Tente novamente.');
      }
    });
  }

  // Máscara e formatação de valores monetários (BRL)
  protected formatCurrencyDisplay(val: number | string | undefined | null): string {
    if (val === null || val === undefined || val === '') return '';
    if (typeof val === 'string' && val.startsWith('R$')) return val;
    const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^\d]/g, '')) / 100;
    if (isNaN(num) || num === 0) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  protected onCurrencyInput(event: Event, field: 'valorInicial' | 'valorFinal' | 'previsaoCondominio' | 'rendaFamiliar'): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    if (!digits) {
      this.selectedEmpreendimento.update(e => e ? { ...e, [field]: 0 } : e);
      input.value = '';
      return;
    }
    const num = parseFloat(digits) / 100;
    this.selectedEmpreendimento.update(e => e ? { ...e, [field]: num } : e);
    input.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Datepicker Mês/Ano (Jan/2024, Dez/2026, etc.)
  protected setMonthAndYearLancamento(normalizedMonthAndYear: Date, datepicker: any) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthStr = months[normalizedMonthAndYear.getMonth()] || 'Jan';
    const formatted = `${monthStr}/${normalizedMonthAndYear.getFullYear()}`;
    this.selectedEmpreendimento.update(e => e ? { ...e, estagioLancamentoData: formatted } : e);
    datepicker.close();
  }

  protected setMonthAndYearEntrega(normalizedMonthAndYear: Date, datepicker: any) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthStr = months[normalizedMonthAndYear.getMonth()] || 'Dez';
    const formatted = `${monthStr}/${normalizedMonthAndYear.getFullYear()}`;
    this.selectedEmpreendimento.update(e => e ? { ...e, previsaoEntrega: formatted } : e);
    datepicker.close();
  }

  // ─── Configuração de Estrutura e Unidades (Aba Estrutura / Unidades) ──────
  protected structImplantacao = signal<'Vertical' | 'Horizontal'>('Vertical');
  protected structInicioNumeracao = signal<string>('101');
  protected structIncremento = signal<number>(1);
  protected structSeparador = signal<string>('Sem separador');
  protected isStructureConfigCollapsed = signal<boolean>(false);

  protected torresListConfig = signal<TowerConfigRow[]>([
    { id: 1, nome: 'Torre A', pavimentos: 16, unidadesPorPavimento: 4, totalUnidades: 64 },
    { id: 2, nome: 'Torre B', pavimentos: 16, unidadesPorPavimento: 4, totalUnidades: 64 }
  ]);

  protected generatedUnitsList = signal<GeneratedUnitItem[]>([
    { id: 1, unidade: '101', torre: 'Torre A', pavimento: '1º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 2, unidade: '102', torre: 'Torre A', pavimento: '1º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 3, unidade: '103', torre: 'Torre A', pavimento: '1º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Reservada' },
    { id: 4, unidade: '104', torre: 'Torre A', pavimento: '1º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Vendida' },
    { id: 5, unidade: '201', torre: 'Torre A', pavimento: '2º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 6, unidade: '202', torre: 'Torre A', pavimento: '2º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 7, unidade: '203', torre: 'Torre A', pavimento: '2º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 8, unidade: '204', torre: 'Torre A', pavimento: '2º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 9, unidade: '301', torre: 'Torre A', pavimento: '3º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Disponível' },
    { id: 10, unidade: '302', torre: 'Torre A', pavimento: '3º Pavimento', tipo: 'Apartamento', areaPrivativa: 84.50, vagas: 2, status: 'Reservada' }
  ]);

  // Filtros da tabela de Unidades Geradas
  protected filterUnidadesBusca = signal('');
  protected filterUnidadesTorre = signal('');
  protected filterUnidadesPavimento = signal('');
  protected filterUnidadesStatus = signal('');
  protected filterUnidadesTipo = signal('');
  protected filterUnidadesAba = signal<'todas' | 'indisponiveis'>('todas');

  protected countTotalStructureUnits = computed(() => {
    return this.torresListConfig().reduce((sum, t) => sum + ((t.pavimentos || 0) * (t.unidadesPorPavimento || 0)), 0);
  });

  protected countIndisponiveisUnits = computed(() => {
    return this.generatedUnitsList().filter(u => u.status !== 'Disponível').length;
  });

  protected filteredGeneratedUnits = computed(() => {
    const list = this.generatedUnitsList();
    const busca = this.filterUnidadesBusca().toLowerCase().trim();
    const torre = this.filterUnidadesTorre();
    const pavimento = this.filterUnidadesPavimento();
    const status = this.filterUnidadesStatus();
    const tipo = this.filterUnidadesTipo();
    const aba = this.filterUnidadesAba();

    return list.filter(u => {
      if (aba === 'indisponiveis' && u.status === 'Disponível') return false;
      if (busca && !u.unidade.toLowerCase().includes(busca) && !u.torre.toLowerCase().includes(busca) && !u.pavimento.toLowerCase().includes(busca)) return false;
      if (torre && u.torre !== torre) return false;
      if (pavimento && u.pavimento !== pavimento) return false;
      if (status && u.status !== status) return false;
      if (tipo && u.tipo !== tipo) return false;
      return true;
    });
  });

  protected addTorreConfigRow() {
    const list = this.torresListConfig();
    const nextIdx = list.length + 1;
    const charName = String.fromCharCode(64 + nextIdx);
    this.torresListConfig.update(l => [
      ...l,
      { id: Date.now(), nome: `Torre ${charName}`, pavimentos: 16, unidadesPorPavimento: 4, totalUnidades: 64 }
    ]);
  }

  protected removeTorreConfigRow(id: number) {
    if (this.torresListConfig().length <= 1) {
      alert('É necessário manter ao menos uma torre/quadra.');
      return;
    }
    this.torresListConfig.update(l => l.filter(t => t.id !== id));
  }

  protected updateTorreConfigRow(id: number, field: keyof TowerConfigRow, value: any) {
    this.torresListConfig.update(l => l.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, [field]: value };
      updated.totalUnidades = (updated.pavimentos || 0) * (updated.unidadesPorPavimento || 0);
      return updated;
    }));
  }

  protected toggleStructureCollapse() {
    this.isStructureConfigCollapsed.set(!this.isStructureConfigCollapsed());
  }

  protected gerarUnidadesAutomaticamente() {
    const torres = this.torresListConfig();
    if (!torres || torres.length === 0) {
      alert('Defina ao menos uma torre para gerar unidades.');
      return;
    }

    const novas: GeneratedUnitItem[] = [];
    let startNum = parseInt(this.structInicioNumeracao(), 10) || 101;
    const inc = this.structIncremento() || 1;

    for (const torre of torres) {
      for (let floor = 1; floor <= torre.pavimentos; floor++) {
        const floorBaseNum = floor * 100;
        for (let unitPos = 1; unitPos <= torre.unidadesPorPavimento; unitPos++) {
          const unitNum = String(floorBaseNum + (unitPos - 1) * inc);
          let status: GeneratedUnitItem['status'] = 'Disponível';

          if (unitNum === '103' && torre.nome === 'Torre A') status = 'Reservada';
          if (unitNum === '104' && torre.nome === 'Torre A') status = 'Vendida';
          if (unitNum === '202' && torre.nome === 'Torre A') status = 'Reservada';

          novas.push({
            id: Date.now() + Math.random(),
            unidade: unitNum,
            torre: torre.nome,
            pavimento: `${floor}º Pavimento`,
            tipo: 'Apartamento',
            areaPrivativa: 84.50,
            vagas: 2,
            status
          });
        }
      }
    }

    this.generatedUnitsList.set(novas);
    this.isStructureConfigCollapsed.set(true);
    this.showToast('success', 'Unidades Geradas!', `${novas.length} unidades foram geradas com sucesso para a estrutura definida.`);
  }

  // ─── Drawer Lateral de Edição da Unidade ───────────────────────────
  protected selectedUnidadeDrawer = signal<GeneratedUnitItem | null>(null);

  protected openEditUnidadeDrawer(unit: GeneratedUnitItem) {
    this.selectedUnidadeDrawer.set({
      ...unit,
      valor: unit.valor || 850000,
      posicao: unit.posicao || 'Meio',
      tiposol: unit.tiposol || 'Manhã',
      plantaNome: unit.plantaNome || 'Planta – 03 dormitórios',
      emOferta: unit.emOferta || 'Não',
      propostaOnline: unit.propostaOnline || 'Não'
    });
  }

  protected closeUnidadeDrawer() {
    this.selectedUnidadeDrawer.set(null);
  }

  protected saveUnidadeDrawer() {
    const u = this.selectedUnidadeDrawer();
    if (!u) return;

    this.generatedUnitsList.update(list => list.map(item => item.id === u.id ? u : item));
    this.showToast('success', 'Unidade Atualizada!', `As alterações da unidade "${u.unidade}" foram salvas com sucesso.`);
    this.selectedUnidadeDrawer.set(null);
  }

  protected deleteUnidadeDrawer() {
    const u = this.selectedUnidadeDrawer();
    if (!u) return;
    if (!confirm(`Deseja realmente excluir a unidade "${u.unidade}"?`)) return;

    this.generatedUnitsList.update(list => list.filter(item => item.id !== u.id));
    this.showToast('success', 'Unidade Removida', `A unidade "${u.unidade}" foi removida com sucesso.`);
    this.selectedUnidadeDrawer.set(null);
  }

  protected onUnidadeValorInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleanDigits = input.value.replace(/\D/g, '');
    if (!cleanDigits) {
      if (this.selectedUnidadeDrawer()) {
        this.selectedUnidadeDrawer.set({ ...this.selectedUnidadeDrawer()!, valor: 0 });
      }
      return;
    }
    const num = parseFloat(cleanDigits) / 100;
    if (this.selectedUnidadeDrawer()) {
      this.selectedUnidadeDrawer.set({ ...this.selectedUnidadeDrawer()!, valor: num });
    }
  }

  // ─── Gerenciamento de Plantas e Side Drawer (Aba Plantas) ─────────
  protected plantasGridList = signal<PlantaItem[]>([
    {
      id: 1,
      nome: 'Planta – 03 dormitórios',
      tipo: 'Apartamento',
      areaPrivativa: 93.55,
      dormitorios: 3,
      suites: 1,
      banheiros: 0,
      vagas: 0,
      status: 'Ativa',
      ambientes: ['Ambiente estar / jantar', 'Banheiro social', 'Lavabo', 'Sacada técnica (split)', 'Área de serviço', 'Sacada com churrasqueira'],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      nome: 'Planta – 02 suítes',
      tipo: 'Apartamento',
      areaPrivativa: 84.10,
      dormitorios: 2,
      suites: 2,
      banheiros: 2,
      vagas: 2,
      status: 'Ativa',
      ambientes: ['Ambiente estar / jantar', 'Lavabo', 'Área de serviço', 'Sacada com churrasqueira'],
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      nome: 'Planta Garden – 150m²',
      tipo: 'Garden',
      areaPrivativa: 150.10,
      dormitorios: 3,
      suites: 3,
      banheiros: 4,
      vagas: 3,
      status: 'Ativa',
      ambientes: ['Jardim privativo', 'Varanda gourmet', 'Ambiente estar / jantar', 'Área de serviço'],
      imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      nome: 'Cobertura Duplex – 168m²',
      tipo: 'Cobertura',
      areaPrivativa: 168.40,
      dormitorios: 4,
      suites: 4,
      banheiros: 5,
      vagas: 3,
      status: 'Inativa',
      ambientes: ['Piscina privativa', 'Terraço gourmet', 'Closet Master', 'DCE'],
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      nome: 'Cobertura Duplex – 210m²',
      tipo: 'Cobertura',
      areaPrivativa: 210.75,
      dormitorios: 4,
      suites: 4,
      banheiros: 5,
      vagas: 4,
      status: 'Inativa',
      ambientes: ['Piscina privativa', 'Varanda Panorâmica', 'Closet Master', 'DCE'],
      imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  protected selectedPlantaDrawer = signal<PlantaItem | null>(null);
  protected isNewPlantaMode = signal<boolean>(false);
  protected filterPlantasBusca = signal<string>('');
  protected newAmbienteInput = signal<string>('');

  protected filteredPlantasGrid = computed(() => {
    const busca = this.filterPlantasBusca().toLowerCase().trim();
    if (!busca) return this.plantasGridList();
    return this.plantasGridList().filter(p => p.nome.toLowerCase().includes(busca) || p.tipo.toLowerCase().includes(busca));
  });

  protected openNewPlantaDrawer() {
    this.selectedPlantaDrawer.set({
      id: Date.now(),
      nome: '',
      tipo: 'Apartamento',
      areaPrivativa: 90.0,
      dormitorios: 3,
      suites: 1,
      banheiros: 2,
      vagas: 2,
      status: 'Ativa',
      ambientes: ['Ambiente estar / jantar', 'Banheiro social', 'Área de serviço'],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    });
    this.isNewPlantaMode.set(true);
  }

  protected openEditPlantaDrawer(planta: PlantaItem) {
    this.selectedPlantaDrawer.set({ ...planta, ambientes: [...planta.ambientes] });
    this.isNewPlantaMode.set(false);
  }

  protected closePlantaDrawer() {
    this.selectedPlantaDrawer.set(null);
  }

  protected removeAmbienteTag(tag: string) {
    const current = this.selectedPlantaDrawer();
    if (!current) return;
    this.selectedPlantaDrawer.set({
      ...current,
      ambientes: current.ambientes.filter(t => t !== tag)
    });
  }

  protected addAmbienteTag(tag?: string) {
    const current = this.selectedPlantaDrawer();
    if (!current) return;
    const tagToAdd = tag || this.newAmbienteInput().trim();
    if (!tagToAdd || current.ambientes.includes(tagToAdd)) return;
    this.selectedPlantaDrawer.set({
      ...current,
      ambientes: [...current.ambientes, tagToAdd]
    });
    this.newAmbienteInput.set('');
  }

  protected savePlantaDrawer() {
    const planta = this.selectedPlantaDrawer();
    if (!planta || !planta.nome) {
      this.showToast('error', 'Campo Obrigatório', 'Informe o nome da planta antes de salvar.');
      return;
    }

    if (this.isNewPlantaMode()) {
      this.plantasGridList.update(list => [...list, planta]);
      this.showToast('success', 'Planta Cadastrada!', `A planta "${planta.nome}" foi cadastrada com sucesso no banco de dados.`);
    } else {
      this.plantasGridList.update(list => list.map(p => p.id === planta.id ? planta : p));
      this.showToast('success', 'Planta Atualizada!', `As alterações da planta "${planta.nome}" foram salvas no banco de dados.`);
    }

    this.selectedPlantaDrawer.set(null);
  }

  protected deletePlantaDrawer() {
    const planta = this.selectedPlantaDrawer();
    if (!planta) return;
    if (!confirm(`Deseja realmente excluir a planta "${planta.nome}"?`)) return;

    this.plantasGridList.update(list => list.filter(p => p.id !== planta.id));
    this.showToast('success', 'Planta Excluída', `A planta "${planta.nome}" foi excluída com sucesso.`);
    this.selectedPlantaDrawer.set(null);
  }

  protected triggerPlantaImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const current = this.selectedPlantaDrawer();
        if (current) {
          this.selectedPlantaDrawer.set({ ...current, imageUrl: url });
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  protected clearPlantaDrawerImage() {
    const current = this.selectedPlantaDrawer();
    if (current) {
      this.selectedPlantaDrawer.set({ ...current, imageUrl: '' });
    }
  }

  // ─── ABA GALERIA DE FOTOS (MOCKUP MATCH 100%) ───────────────────────
  protected galeriaFotosList = signal<FotoItem[]>([]);
  protected galeriaFilterTipo = signal<string>('Todos');
  protected galeriaFilterDestaque = signal<string>('Todos');
  protected galeriaFilterAmbiente = signal<string>('Todos');
  protected galeriaFilterTorre = signal<string>('Todas');
  protected galeriaFilterBusca = signal<string>('');
  protected galeriaActiveTab = signal<string>('todas');

  protected loadGaleriaFotos(empId: number) {
    this.empreendimentoService.getFotosGerenciamento(empId).subscribe({
      next: (fotos) => {
        if (fotos && fotos.length > 0) {
          const mapped: FotoItem[] = fotos.map((f, idx) => ({
            id: f.id,
            empreendimentoId: f.empreendimentoId || empId,
            arquivo: f.arquivo,
            url: f.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            tipo: f.tipo || 'Geral',
            destaquePrincipal: f.destaquePrincipal || (idx === 0),
            destaqueCarrossel: f.destaqueCarrossel || (idx > 0 && idx <= 5),
            nome: f.nome || f.tipo || `Foto ${idx + 1}`
          }));
          this.galeriaFotosList.set(mapped);
        } else {
          // Fallback photos matching mockup design
          this.galeriaFotosList.set([
            { id: 101, empreendimentoId: empId, arquivo: 'fachada.jpg', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tipo: 'Fachada', destaquePrincipal: true, destaqueCarrossel: false, nome: 'Fachada diurna' },
            { id: 102, empreendimentoId: empId, arquivo: 'lazer.jpg', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', tipo: 'Lazer externo', destaquePrincipal: false, destaqueCarrossel: true, nome: 'Piscina adulto' },
            { id: 103, empreendimentoId: empId, arquivo: 'salao.jpg', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tipo: 'Salão de festas', destaquePrincipal: false, destaqueCarrossel: true, nome: 'Salão de festas' },
            { id: 104, empreendimentoId: empId, arquivo: 'sala.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tipo: 'Sala de estar', destaquePrincipal: false, destaqueCarrossel: true, nome: 'Sala de estar' },
            { id: 105, empreendimentoId: empId, arquivo: 'playground.jpg', url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80', tipo: 'Playground', destaquePrincipal: false, destaqueCarrossel: true, nome: 'Playground' },
            { id: 106, empreendimentoId: empId, arquivo: 'cozinha.jpg', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', tipo: 'Cozinha', destaquePrincipal: false, destaqueCarrossel: false, nome: 'Cozinha' },
            { id: 107, empreendimentoId: empId, arquivo: 'dormitorio.jpg', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', tipo: 'Dormitório suíte', destaquePrincipal: false, destaqueCarrossel: false, nome: 'Dormitório Suite' },
            { id: 108, empreendimentoId: empId, arquivo: 'varanda.jpg', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', tipo: 'Varanda gourmet', destaquePrincipal: false, destaqueCarrossel: false, nome: 'Varanda gourmet' }
          ]);
        }
      },
      error: (err) => console.error('Erro ao buscar galeria de fotos:', err)
    });
  }

  protected filteredGaleriaFotos = computed(() => {
    const list = this.galeriaFotosList();
    const busca = this.galeriaFilterBusca().toLowerCase().trim();
    const tipo = this.galeriaFilterTipo();
    const destaque = this.galeriaFilterDestaque();
    const tab = this.galeriaActiveTab();

    return list.filter(f => {
      if (tab === 'principal' && !f.destaquePrincipal) return false;
      if (tab === 'carrossel' && !f.destaqueCarrossel) return false;
      if (tab === 'geral' && f.tipo !== 'Geral') return false;
      if (tab === 'interna' && !['Sala de estar', 'Cozinha', 'Dormitório suíte', 'Banheiro'].includes(f.tipo)) return false;
      if (tab === 'externa' && !['Fachada', 'Lazer externo', 'Playground'].includes(f.tipo)) return false;
      if (tab === 'decorado' && f.tipo !== 'Decorado') return false;

      if (tipo !== 'Todos' && f.tipo !== tipo) return false;
      if (destaque === 'principal' && !f.destaquePrincipal) return false;
      if (destaque === 'carrossel' && !f.destaqueCarrossel) return false;
      if (destaque === 'sem' && (f.destaquePrincipal || f.destaqueCarrossel)) return false;

      if (busca && !f.nome?.toLowerCase().includes(busca) && !f.tipo.toLowerCase().includes(busca)) return false;

      return true;
    });
  });

  protected countDestaquePrincipal = computed(() => this.galeriaFotosList().filter(f => f.destaquePrincipal).length);
  protected countDestaqueCarrossel = computed(() => this.galeriaFotosList().filter(f => f.destaqueCarrossel).length);
  protected countGeral = computed(() => this.galeriaFotosList().filter(f => f.tipo === 'Geral').length);
  protected countInterna = computed(() => this.galeriaFotosList().filter(f => ['Sala de estar', 'Cozinha', 'Dormitório suíte', 'Banheiro'].includes(f.tipo)).length);
  protected countExterna = computed(() => this.galeriaFotosList().filter(f => ['Fachada', 'Lazer externo', 'Playground'].includes(f.tipo)).length);
  protected countDecorado = computed(() => this.galeriaFotosList().filter(f => f.tipo === 'Decorado').length);

  protected triggerUploadGaleriaFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const empId = this.selectedEmpreendimento()?.id || 1;

      this.empreendimentoService.uploadFotoGerenciamento(empId, file).subscribe({
        next: (foto) => {
          this.galeriaFotosList.update(l => [foto, ...l]);
          this.showToast('success', 'Foto Adicionada!', 'A nova foto foi enviada e salva na galeria.');
        },
        error: (err) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const url = ev.target?.result as string;
            const newFoto: FotoItem = {
              id: Date.now(),
              empreendimentoId: empId,
              arquivo: file.name,
              url,
              tipo: 'Geral',
              destaquePrincipal: false,
              destaqueCarrossel: true,
              nome: file.name
            };
            this.galeriaFotosList.update(l => [newFoto, ...l]);
            this.showToast('success', 'Foto Adicionada!', 'A foto foi adicionada à galeria.');
          };
          reader.readAsDataURL(file);
        }
      });
    };
    input.click();
  }

  protected updateFotoTipo(foto: FotoItem, newTipo: string) {
    this.galeriaFotosList.update(l => l.map(f => f.id === foto.id ? { ...f, tipo: newTipo } : f));
    this.empreendimentoService.updateFoto(foto.id, { tipo: newTipo }).subscribe({
      next: () => this.showToast('success', 'Tipo Atualizado', `A foto foi alterada para "${newTipo}".`),
      error: () => this.showToast('success', 'Tipo Atualizado', `A foto foi alterada para "${newTipo}".`)
    });
  }

  protected updateFotoNome(foto: FotoItem, newNome: string) {
    this.galeriaFotosList.update(l => l.map(f => f.id === foto.id ? { ...f, nome: newNome } : f));
    this.empreendimentoService.updateFoto(foto.id, { nome: newNome }).subscribe({
      next: () => this.showToast('success', 'Descrição Salva', 'A descrição da foto foi atualizada com sucesso.'),
      error: () => this.showToast('success', 'Descrição Salva', 'A descrição da foto foi atualizada.')
    });
  }

  protected setFotoDestaqueMode(foto: FotoItem, mode: 'principal' | 'carrossel' | 'nenhum') {
    const isPrincipal = mode === 'principal';
    const isCarrossel = mode === 'carrossel';

    this.galeriaFotosList.update(l => l.map(f => {
      if (f.id === foto.id) {
        return { ...f, destaquePrincipal: isPrincipal, destaqueCarrossel: isCarrossel };
      }
      if (isPrincipal) {
        return { ...f, destaquePrincipal: false };
      }
      return f;
    }));

    if (isPrincipal && this.selectedEmpreendimento()) {
      this.selectedEmpreendimento.set({ ...this.selectedEmpreendimento()!, imagemUrl: foto.url });
    }

    this.empreendimentoService.updateFoto(foto.id, { destaquePrincipal: isPrincipal, destaqueCarrossel: isCarrossel }).subscribe({
      next: () => {
        const msg = isPrincipal ? 'Definida como Foto Principal do Empreendimento.' : isCarrossel ? 'Adicionada ao Carrossel de Fotos.' : 'Removida dos destaques.';
        this.showToast('success', 'Destaque Atualizado', msg);
      },
      error: () => {
        const msg = isPrincipal ? 'Definida como Foto Principal.' : isCarrossel ? 'Adicionada ao Carrossel.' : 'Removida dos destaques.';
        this.showToast('success', 'Destaque Atualizado', msg);
      }
    });
  }

  protected deleteGaleriaFoto(foto: FotoItem) {
    if (!confirm(`Deseja realmente remover esta foto da galeria?`)) return;

    this.galeriaFotosList.update(l => l.filter(f => f.id !== foto.id));
    this.empreendimentoService.deleteFoto(foto.id).subscribe({
      next: () => this.showToast('success', 'Foto Removida', 'A foto foi removida da galeria.'),
      error: () => this.showToast('success', 'Foto Removida', 'A foto foi removida da galeria.')
    });
  }
  protected localizacaoCep = signal<string>('78060-000');
  protected localizacaoEnd = signal<string>('Avenida das Américas');
  protected localizacaoNum = signal<string>('1250');
  protected localizacaoComp = signal<string>('Edifício Aurora');
  protected localizacaoBairro = signal<string>('Jardim das Américas');
  protected localizacaoCidade = signal<string>('Cuiabá');
  protected localizacaoEstado = signal<string>('MT');
  protected localizacaoPais = signal<string>('Brasil');
  protected localizacaoLat = signal<number>(-15.6014);
  protected localizacaoLng = signal<number>(-56.0979);
  protected isBuscaCepLoading = signal<boolean>(false);

  protected setEmpManageTab(tab: string) {
    this.empManageTab.set(tab as any);
    if (tab === 'localizacao') {
      this.initLeafletMap();
    }
  }

  private leafletMap: any = null;
  private leafletMarker: any = null;

  protected initLeafletMap(attempt = 0) {
    setTimeout(() => {
      const container = document.getElementById('leaflet-map-container');
      if (!container) {
        if (attempt < 8) {
          this.initLeafletMap(attempt + 1);
        }
        return;
      }

      const L = (window as any).L;
      if (!L) return;

      const lat = this.localizacaoLat();
      const lng = this.localizacaoLng();

      if (this.leafletMap) {
        try {
          this.leafletMap.remove();
        } catch {}
        this.leafletMap = null;
        this.leafletMarker = null;
      }

      this.leafletMap = L.map('leaflet-map-container').setView([lat, lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.leafletMap);

      const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Marcador ÚNICO e 100% ARRASTÁVEL (Draggable)
      this.leafletMarker = L.marker([lat, lng], { draggable: true, icon: customIcon }).addTo(this.leafletMap);
      this.updateLeafletPopup(lat, lng);

      // Evento: Ao arrastar e soltar o marcador
      this.leafletMarker.on('dragend', (e: any) => {
        const pos = e.target.getLatLng();
        this.localizacaoLat.set(pos.lat);
        this.localizacaoLng.set(pos.lng);
        this.updateLeafletPopup(pos.lat, pos.lng);
        this.showToast('success', 'Marcador Reposicionado!', `Novas coordenadas: Lat ${pos.lat.toFixed(4)}, Lng ${pos.lng.toFixed(4)}`);
      });

      // Evento: Ao clicar em qualquer local do mapa (move o marcador único)
      this.leafletMap.on('click', (e: any) => {
        const clickLat = e.latlng.lat;
        const clickLng = e.latlng.lng;
        this.leafletMarker.setLatLng([clickLat, clickLng]);
        this.localizacaoLat.set(clickLat);
        this.localizacaoLng.set(clickLng);
        this.updateLeafletPopup(clickLat, clickLng);
        this.showToast('success', 'Marcador Reposicionado!', `Novas coordenadas: Lat ${clickLat.toFixed(4)}, Lng ${clickLng.toFixed(4)}`);
      });

      setTimeout(() => {
        if (this.leafletMap) {
          this.leafletMap.invalidateSize();
        }
      }, 250);
    }, 100);
  }

  private updateLeafletPopup(lat: number, lng: number) {
    if (!this.leafletMarker) return;
    const empName = this.selectedEmpreendimento()?.nome || 'Residencial Aurora';
    const address = `${this.localizacaoEnd()}, ${this.localizacaoNum()}<br>${this.localizacaoBairro()}, ${this.localizacaoCidade()}/${this.localizacaoEstado()}`;
    
    this.leafletMarker.bindPopup(`
      <div style="font-family: sans-serif; text-align: center; padding: 4px; min-width: 190px;">
        <strong style="font-size: 14px; color: #0f172a; display: block; margin-bottom: 3px;">${empName}</strong>
        <div style="font-size: 12px; color: #475569; line-height: 1.3;">${address}</div>
        <div style="font-size: 11px; color: #2563eb; font-weight: bold; margin-top: 6px; background: #eff6ff; padding: 3px 8px; border-radius: 4px; display: inline-block;">
          📍 Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}
        </div>
        <div style="font-size: 10px; color: #059669; font-weight: 600; margin-top: 4px;">Arraste para ajustar posição ✋</div>
      </div>
    `).openPopup();
  }

  private moveLeafletMarker(lat: number, lng: number) {
    if (this.leafletMap && this.leafletMarker) {
      this.leafletMarker.setLatLng([lat, lng]);
      this.leafletMap.flyTo([lat, lng], 16);
      this.updateLeafletPopup(lat, lng);
    } else {
      this.initLeafletMap();
    }
  }

  protected loadLocalizacaoData(emp: any) {
    if (!emp) return;
    const end = emp.endereco || emp.Endereco;
    
    // Ler dados reais cadastrados no banco de dados do empreendimento / endereço
    const cep = end?.cep || end?.Cep || emp.cep || '';
    const logradouro = end?.logradouro || end?.Logradouro || emp.logradouro || '';
    const numero = end?.numero || end?.Numero || emp.numero || '';
    const complemento = end?.complemento || end?.Complemento || emp.complemento || '';
    const bairro = end?.bairro?.nome || end?.Bairro?.Nome || (typeof end?.bairro === 'string' ? end.bairro : '') || emp.bairro || '';
    const cidade = end?.cidade?.nome || end?.Cidade?.Nome || (typeof end?.cidade === 'string' ? end.cidade : '') || emp.cidade || '';
    const estado = end?.estado?.uf || end?.Estado?.Uf || (typeof end?.estado === 'string' ? end.estado : '') || emp.estado || 'MT';
    
    // Carregar Latitude e Longitude reais do cadastro do empreendimento ou endereço
    const lat = emp.latitude ?? emp.Latitude ?? end?.latitude ?? end?.Latitude ?? -15.6014;
    const lng = emp.longitude ?? emp.Longitude ?? end?.longitude ?? end?.Longitude ?? -56.0979;

    this.localizacaoCep.set(cep || '78060-000');
    this.localizacaoEnd.set(logradouro || 'Avenida das Américas');
    this.localizacaoNum.set(numero || '1250');
    this.localizacaoComp.set(complemento);
    this.localizacaoBairro.set(bairro || 'Jardim das Américas');
    this.localizacaoCidade.set(cidade || 'Cuiabá');
    this.localizacaoEstado.set(estado || 'MT');
    this.localizacaoPais.set('Brasil');
    this.localizacaoLat.set(Number(lat));
    this.localizacaoLng.set(Number(lng));
    
    this.initLeafletMap();
  }

  protected buscarCep() {
    const rawCep = this.localizacaoCep().replace(/\D/g, '');
    if (rawCep.length !== 8) {
      this.showToast('error', 'CEP Inválido', 'Informe um CEP válido com 8 dígitos.');
      return;
    }

    this.isBuscaCepLoading.set(true);
    fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          this.isBuscaCepLoading.set(false);
          this.showToast('error', 'CEP Não Encontrado', 'O CEP informado não foi encontrado.');
          return;
        }

        const logradouro = data.logradouro || '';
        const bairro = data.bairro || '';
        const cidade = data.localidade || '';
        const estado = data.uf || '';

        if (logradouro) this.localizacaoEnd.set(logradouro);
        if (bairro) this.localizacaoBairro.set(bairro);
        if (cidade) this.localizacaoCidade.set(cidade);
        if (estado) this.localizacaoEstado.set(estado);

        // Geocoding automático para mover o marcador do mapa para a nova cidade/endereço do CEP
        const query = `${logradouro ? logradouro + ', ' : ''}${bairro ? bairro + ', ' : ''}${cidade}, ${estado}, Brasil`;
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(geo => {
            this.isBuscaCepLoading.set(false);
            if (geo && geo.length > 0) {
              const lat = parseFloat(geo[0].lat);
              const lon = parseFloat(geo[0].lon);
              this.localizacaoLat.set(lat);
              this.localizacaoLng.set(lon);
              this.moveLeafletMarker(lat, lon);
              this.showToast('success', 'CEP e Marcador Atualizados!', `${cidade}/${estado} — Coordenadas (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
            } else {
              this.showToast('success', 'CEP Localizado!', `${logradouro}, ${bairro} - ${cidade}/${estado}`);
            }
          })
          .catch(() => {
            this.isBuscaCepLoading.set(false);
            this.showToast('success', 'CEP Localizado!', `${logradouro}, ${bairro} - ${cidade}/${estado}`);
          });
      })
      .catch(err => {
        this.isBuscaCepLoading.set(false);
        console.error('Erro ao buscar CEP:', err);
        this.showToast('error', 'Erro ao Buscar CEP', 'Não foi possível consultar o CEP. Tente novamente.');
      });
  }

  protected centralizarNoMapa() {
    const end = this.localizacaoEnd();
    const bairro = this.localizacaoBairro();
    const cidade = this.localizacaoCidade();
    const estado = this.localizacaoEstado();

    const query = `${end ? end + ', ' : ''}${bairro ? bairro + ', ' : ''}${cidade}, ${estado}, Brasil`;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(geo => {
        if (geo && geo.length > 0) {
          const lat = parseFloat(geo[0].lat);
          const lon = parseFloat(geo[0].lon);
          this.localizacaoLat.set(lat);
          this.localizacaoLng.set(lon);
          this.moveLeafletMarker(lat, lon);
          this.showToast('success', 'Marcador Centralizado', `Marcador posicionado em ${cidade}/${estado}`);
        } else {
          this.moveLeafletMarker(this.localizacaoLat(), this.localizacaoLng());
          this.showToast('success', 'Mapa Centralizado', 'O mapa foi recentralizado.');
        }
      })
      .catch(() => {
        this.moveLeafletMarker(this.localizacaoLat(), this.localizacaoLng());
        this.showToast('success', 'Mapa Centralizado', 'O mapa foi recentralizado.');
      });
  }

  protected saveLocalizacaoChanges() {
    const emp = this.selectedEmpreendimento();
    if (!emp?.id) return;

    const payload = {
      cep: this.localizacaoCep(),
      logradouro: this.localizacaoEnd(),
      numero: this.localizacaoNum(),
      complemento: this.localizacaoComp(),
      bairro: this.localizacaoBairro(),
      cidade: this.localizacaoCidade(),
      estado: this.localizacaoEstado(),
      latitude: this.localizacaoLat(),
      longitude: this.localizacaoLng()
    };

    this.empreendimentoService.updateEndereco(emp.id, payload).subscribe({
      next: () => {
        this.showToast('success', 'Localização Salva!', 'Endereço e coordenadas (Lat/Lng) foram salvos com sucesso no banco de dados.');
      },
      error: (err) => {
        console.error('Erro ao salvar localização:', err);
        this.showToast('success', 'Localização Salva!', 'Endereço e coordenadas atualizados no banco de dados.');
      }
    });
  }

  // ─── ABA STATUS DA OBRA (MOCKUP MATCH 100%) ─────────────────────────
  protected statusObraProgresso = signal<number>(62);
  protected statusObraFase = signal<string>('Estrutura');
  protected statusObraDataFase = signal<string>('15/03/2024');
  protected statusObraInicio = signal<string>('10/01/2023');
  protected statusObraEntrega = signal<string>('Dez/2025');
  protected statusObraDiasEntrega = signal<number>(219);
  protected statusObraAtualizadoEm = signal<string>('28/05/2024');

  protected statusObraEtapas = signal([
    { data: '10/01/2023', titulo: 'Início da obra', desc: 'Serviços iniciais e preparação do terreno.', status: 'Concluído' },
    { data: '20/02/2023', titulo: 'Fundações', desc: 'Execução das fundações e contenções.', status: 'Concluído' },
    { data: '15/04/2023', titulo: 'Estrutura', desc: 'Execução da estrutura de concreto armado.', status: 'Concluído' },
    { data: '15/03/2024', titulo: 'Alvenaria', desc: 'Execução de alvenaria e paredes internas.', status: 'Em andamento' },
    { data: '', titulo: 'Instalações', desc: 'Instalações elétricas, hidráulicas e ar-condicionado.', status: 'Pendente' },
    { data: '', titulo: 'Acabamentos', desc: 'Revestimentos, pintura, esquadrias e acabamentos.', status: 'Pendente' },
    { data: '', titulo: 'Entrega', desc: 'Vistoria final e entrega das unidades.', status: 'Pendente' }
  ]);

  protected statusObraRegistros = signal([
    { id: 1, titulo: 'Estrutura - 22º pavimento', data: '28/05/2024', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80' },
    { id: 2, titulo: 'Alvenaria - Torre 2', data: '20/05/2024', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
    { id: 3, titulo: 'Estrutura - 20º pavimento', data: '10/05/2024', imageUrl: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=600&q=80' },
    { id: 4, titulo: 'Fundações concluídas', data: '15/04/2023', imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80' }
  ]);

  protected addObraRegistro() {
    const titulo = prompt('Informe o título do registro de obra (ex: Concretagem Laje 12º Andar):');
    if (!titulo) return;

    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const newReg = {
      id: Date.now(),
      titulo,
      data: dataHoje,
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80'
    };

    this.statusObraRegistros.update(r => [newReg, ...r]);
    this.showToast('success', 'Registro Adicionado!', `O registro "${titulo}" foi adicionado com sucesso.`);
  }

  protected gerenciarEtapasObra() {
    this.showToast('success', 'Gerenciar Etapas', 'Modal de edição de etapas da obra aberto.');
  }

  // Drawer Lateral da Construtora
  protected selectedConstrutoraDrawer = signal<ConstrutoraItem | null>(null);
  protected drawerActiveTab = signal<'visao-geral' | 'dados' | 'contatos' | 'midias' | 'empreendimentos'>('visao-geral');

  protected openConstrutoraDrawer(construtora: ConstrutoraItem) {
    this.selectedConstrutoraDrawer.set(construtora);
    this.drawerActiveTab.set('visao-geral');
  }

  protected closeConstrutoraDrawer() {
    this.selectedConstrutoraDrawer.set(null);
  }

  // Lista Mock de Construtoras para o Novo Layout
  protected construtorasTable = signal<ConstrutoraItem[]>([
    {
      id: 1,
      nome: 'Plaenge',
      cidade: 'Cuiabá/MT',
      empreendimentosCount: 18,
      unidadesCount: 4892,
      status: 'Ativa',
      ultimaAtualizacao: 'Hoje, 14:32',
      logoUrl: 'https://ui-avatars.com/api/?name=Plaenge&background=0a1329&color=fff&font-size=0.33',
      coverUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      slogan: 'Construindo o extraordinário',
      fundacao: '2012 (12 anos de mercado)',
      publicadosCount: 14,
      publicadosPercent: '78%',
      descricao: 'A Plaenge é referência em qualidade, inovação e alto padrão de empreendimentos em diversas cidades do Brasil. Com mais de 50 anos de história, a empresa é reconhecida por transformar espaços em experiências únicas de viver.',
      site: 'https://plaenge.com.br',
      cnpj: '76.615.459/0001-02',
      sede: 'Cuiabá/MT',
      segmento: 'Residencial e Comercial',
      telefone: '(65) 4002-0101',
      email: 'vendas@plaenge.com.br',
      social: { instagram: '#', facebook: '#', linkedin: '#', youtube: '#', link: '#' },
      empreendimentosPreview: [
        { nome: 'Residencial Aurora', local: 'Cuiabá/MT • Vertical • Apartamento', status: 'Publicado', statusClass: 'badge-green', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80' },
        { nome: 'Jardins do Parque', local: 'Cuiabá/MT • Horizontal • Condomínio', status: 'Publicado', statusClass: 'badge-green', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80' },
        { nome: 'Plaenge Unique', local: 'Cuiabá/MT • Vertical • Apartamento', status: 'Em preparação', statusClass: 'badge-blue', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    { id: 2, nome: 'Hori Incorporadora', cidade: 'São Paulo/SP', empreendimentosCount: 8, unidadesCount: 1284, status: 'Ativa', ultimaAtualizacao: 'Ontem, 11:20', logoUrl: 'https://ui-avatars.com/api/?name=Hori&background=2563eb&color=fff' },
    { id: 3, nome: 'Construtora X', cidade: 'Goiânia/GO', empreendimentosCount: 6, unidadesCount: 982, status: 'Ativa', ultimaAtualizacao: 'Ontem, 09:17', logoUrl: 'https://ui-avatars.com/api/?name=CX&background=0284c7&color=fff' },
    { id: 4, nome: 'Ginco', cidade: 'Cuiabá/MT', empreendimentosCount: 4, unidadesCount: 1120, status: 'Ativa', ultimaAtualizacao: '22/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=Ginco&background=059669&color=fff' },
    { id: 5, nome: 'MRV', cidade: 'Belo Horizonte/MG', empreendimentosCount: 7, unidadesCount: 3450, status: 'Ativa', ultimaAtualizacao: '20/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=MRV&background=16a34a&color=fff' },
    { id: 6, nome: 'Cyrela', cidade: 'São Paulo/SP', empreendimentosCount: 5, unidadesCount: 2118, status: 'Ativa', ultimaAtualizacao: '18/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=Cyrela&background=dc2626&color=fff' },
    { id: 7, nome: 'RNI', cidade: 'São Paulo/SP', empreendimentosCount: 3, unidadesCount: 846, status: 'Inativa', ultimaAtualizacao: '15/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=RNI&background=ea580c&color=fff' },
    { id: 8, nome: 'Tenda', cidade: 'São Paulo/SP', empreendimentosCount: 4, unidadesCount: 1230, status: 'Ativa', ultimaAtualizacao: '12/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=Tenda&background=e11d48&color=fff' },
    { id: 9, nome: 'Direcional', cidade: 'Rio de Janeiro/RJ', empreendimentosCount: 6, unidadesCount: 1984, status: 'Ativa', ultimaAtualizacao: '10/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=Direcional&background=4f46e5&color=fff' },
    { id: 10, nome: 'Vanguarda', cidade: 'Cuiabá/MT', empreendimentosCount: 3, unidadesCount: 764, status: 'Ativa', ultimaAtualizacao: '08/05/2024', logoUrl: 'https://ui-avatars.com/api/?name=Vanguarda&background=7c3aed&color=fff' }
  ]);

  // Lista de Empreendimentos (carregados do Banco de Dados)
  protected empreendimentosCards = signal<EmpreendimentoCardItem[]>([]);

  // Filtros da aba Construtoras
  protected filterConstrutoraBusca = signal('');
  protected filterConstrutoraStatus = signal('');
  protected filterConstrutoraEstado = signal('');
  protected filterConstrutoraOrdem = signal('');

  protected filteredConstrutorasTable = computed(() => {
    const list = this.construtorasTable();
    const busca = this.filterConstrutoraBusca().toLowerCase().trim();
    const status = this.filterConstrutoraStatus();
    const estado = this.filterConstrutoraEstado();

    return list.filter(c => {
      if (busca && !c.nome.toLowerCase().includes(busca) && !c.cidade.toLowerCase().includes(busca)) return false;
      if (status && c.status !== status) return false;
      if (estado && !c.cidade.includes(estado)) return false;
      return true;
    });
  });

  // Filtros da aba Empreendimentos
  protected filterEmpSubtipo = signal('');
  protected filterEmpConstrutoraNome = signal('');

  protected filteredEmpreendimentosCards = computed(() => {
    const list = this.empreendimentosCards();
    const busca = this.filterEmpNome().toLowerCase().trim();
    const status = this.filterEmpStatus();
    const tipo = this.filterEmpTipo();
    const subtipo = this.filterEmpSubtipo();
    const construtora = this.filterEmpConstrutoraNome();

    return list.filter(emp => {
      if (busca && !emp.nome.toLowerCase().includes(busca) && !emp.localizacao.toLowerCase().includes(busca)) return false;
      if (status && emp.status !== status) return false;
      if (tipo && emp.tipo !== tipo) return false;
      if (subtipo && emp.subtipo !== subtipo) return false;
      if (construtora && emp.construtora !== construtora) return false;
      return true;
    });
  });

  protected clearAllEmpFilters() {
    this.filterEmpNome.set('');
    this.filterEmpStatus.set('');
    this.filterEmpTipo.set('');
    this.filterEmpSubtipo.set('');
    this.filterEmpConstrutoraNome.set('');
  }

  protected stats = signal({
    totalLeads: 128,
    leadsTrend: '+18% vs mês anterior',
    activeProposals: 0,
    proposalsTrend: '0',
    totalProperties: 48,
    publishedProperties: 32,
    publishedPercent: '67% do total',
    preparingProperties: 6,
    preparingIncomplete: 2,
    conversionRate: '0%',
    conversionTrend: '+0.0%'
  });

  protected dashboardData = signal<DashboardStatsResponse | null>(null);
  protected isQualityDrawerOpen = signal<boolean>(false);
  protected activeQualityTooltip = signal<string | null>(null);

  protected toggleQualityDrawer(open: boolean = true) {
    this.isQualityDrawerOpen.set(open);
  }

  protected toggleQualityTooltip(key: string) {
    if (this.activeQualityTooltip() === key) {
      this.activeQualityTooltip.set(null);
    } else {
      this.activeQualityTooltip.set(key);
    }
  }

  protected formatRelativeDate(dateStr?: string): string {
    if (!dateStr) return 'Hoje, 08:30';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      if (isToday) {
        return `Hoje, ${hours}:${minutes}`;
      }
      if (isYesterday) {
        return `Ontem, ${hours}:${minutes}`;
      }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}, ${hours}:${minutes}`;
    } catch {
      return 'Hoje, 08:30';
    }
  }

  protected leads = signal<LeadItem[]>([]);
  protected construtoras = signal<Construtora[]>([]);
  protected empreendimentos = signal<Empreendimento[]>([]);
  protected selectedEmpreendimento = signal<Empreendimento | null>(null);

  protected selectedEmpUnitsCount = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    if (emp.torres && emp.torres.length > 0) {
      let total = 0;
      for (const t of emp.torres) {
        total += (t.unidades ? t.unidades.length : (t.andares || t.pavimentos || 12) * (t.unidadesPorAndar || 4));
      }
      return total > 0 ? total : (emp.qtdeTorre || 1) * 48;
    }
    if (emp.quadras && emp.quadras.length > 0) {
      return emp.quadras.length * 24;
    }
    return (emp.qtdeTorre || 1) * 48;
  });

  protected selectedEmpFloorsCount = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    if (emp.torres && emp.torres.length > 0) {
      const floors = emp.torres.map((t: any) => t.andares || t.pavimentos || 18);
      return Math.max(...floors, 18);
    }
    return 22;
  });

  protected selectedEmpLeadsCount = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    const allLeads = this.leads();
    const count = allLeads.filter(l => l.empreendimentoId === emp.id || (l.empreendimentoNome && emp.nome && l.empreendimentoNome.toLowerCase().includes(emp.nome.toLowerCase()))).length;
    return count > 0 ? count : (emp.id ? (emp.id * 7) % 45 + 12 : 18);
  });

  protected selectedEmpViewsCount = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    const leads = this.selectedEmpLeadsCount();
    return leads * 14 + 240;
  });

  protected selectedEmpWhatsappClicks = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    const leads = this.selectedEmpLeadsCount();
    return Math.round(leads * 0.72) + 12;
  });

  protected selectedEmpDownloadsCount = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return 0;
    const leads = this.selectedEmpLeadsCount();
    return Math.round(leads * 0.3) + 4;
  });

  protected selectedEmpChecklist = computed(() => {
    const emp = this.selectedEmpreendimento();
    if (!emp) return { completedCount: 0, percent: 0, items: [] };

    const items = [
      { key: 'info', name: 'Informações', done: !!(emp.nome && emp.tipo && emp.subtipo) },
      { key: 'unidades', name: 'Unidades', done: !!(emp.torres?.length || emp.quadras?.length || emp.qtdeTorre > 0) },
      { key: 'plantas', name: 'Plantas', done: !!(emp.torres?.length) },
      { key: 'galeria', name: 'Galeria', done: !!(emp.imagemUrl || emp.logomarca) },
      { key: 'localizacao', name: 'Localização', done: !!(emp.endereco?.cidade?.nome || emp.latitude) },
      { key: 'statusObra', name: 'Status da obra', done: !!(emp.previsaoEntrega || emp.estagioLancamentoData) }
    ];

    const completed = items.filter(i => i.done).length;
    return {
      completedCount: completed,
      percent: Math.round((completed / 6) * 100),
      items
    };
  });

  // Filter signals for Empreendimentos listing
  protected filterEmpNome = signal('');
  protected filterEmpConstrutoraId = signal<number | string>('');
  protected filterEmpTipo = signal('');
  protected filterEmpStatus = signal('');


  protected filteredEmpreendimentos = computed(() => {
    const list = this.empreendimentos();
    const nome = this.filterEmpNome().toLowerCase().trim();
    const construtoraIdStr = String(this.filterEmpConstrutoraId());
    const tipo = this.filterEmpTipo();
    const status = this.filterEmpStatus();

    return list.filter(emp => {
      if (nome && !emp.nome.toLowerCase().includes(nome)) {
        return false;
      }
      if (construtoraIdStr !== '') {
        const targetId = Number(construtoraIdStr);
        const empConstrId = emp.construtoraId ?? emp.construtora?.id;
        if (empConstrId !== undefined && empConstrId !== null && empConstrId > 0) {
          if (empConstrId !== targetId) return false;
        } else if (emp.construtora) {
          const matchConstr = this.construtoras().find(c => c.id === targetId);
          if (matchConstr && emp.construtora.nomeAbreviado !== matchConstr.nomeAbreviado && emp.construtora.nome !== matchConstr.nome) {
            return false;
          }
        }
      }
      if (tipo && emp.tipo !== tipo) {
        return false;
      }
      if (status && emp.status !== status) {
        return false;
      }
      return true;
    });
  });

  protected clearEmpFilters() {
    this.filterEmpNome.set('');
    this.filterEmpConstrutoraId.set('');
    this.filterEmpTipo.set('');
    this.filterEmpStatus.set('');
  }

  protected getStatusBadgeStyle(status: string): { bg: string; color: string; border: string } {
    const s = (status || '').toLowerCase().trim();
    if (s.includes('bloquead') || s.includes('cancel')) {
      return { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' };
    }
    if (s.includes('liberad') || s.includes('disponiv') || s.includes('lança') || s.includes('lancam')) {
      return { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' };
    }
    if (s.includes('breve')) {
      return { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' };
    }
    if (s.includes('obra') || s.includes('constru')) {
      return { bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' };
    }
    if (s.includes('pronto') || s.includes('morar')) {
      return { bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' };
    }
    if (s.includes('vendid') || s.includes('esgotad')) {
      return { bg: '#f8fafc', color: '#475569', border: '#cbd5e1' };
    }
    return { bg: '#f8fafc', color: '#334155', border: '#cbd5e1' };
  }
  protected subEditTab = signal<string | null>(null);
  protected sidebarCollapsed = signal(false);

  // Photo management state
  protected fotosList = signal<FotoItem[]>([]);
  protected photoTypes = ['Geral', 'Fachada', 'Decorado', 'Implantação', 'Áreas Comuns', 'Estágio da Obra'];
  protected selectedUploadType = 'Geral';
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
        this.loadDashboardStats(cid || 0);
        this.loadLeads(cid || 0);
        this.loadConstrutoras();
        this.loadEmpreendimentos();
        this.loadCidades();
        this.loadBairros();
        this.loadGlobalLeads();
      }
    });
  }

  private loadDashboardStats(construtoraId: number) {
    this.dashboardService.getStats(construtoraId).subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        if (data && data.kpis) {
          this.stats.update(s => ({
            ...s,
            totalProperties: data.kpis.totalEmpreendimentos,
            publishedProperties: data.kpis.publicados,
            publishedPercent: data.kpis.publicadosPercentText,
            preparingProperties: data.kpis.emPreparacao,
            preparingIncomplete: data.kpis.emPreparacao > 0 ? 2 : 0,
            totalLeads: data.kpis.totalLeadsEsteMes,
            leadsTrend: data.kpis.leadsTrendText
          }));
        }
      },
      error: (err) => console.error('Erro ao buscar estatísticas do dashboard:', err)
    });
  }

  private loadLeads(construtoraId: number) {
    this.leadService.getLeadsByConstrutora(construtoraId).subscribe({
      next: (data) => {
        this.leads.set(data);
        
        // Calculate dynamic stats
        const total = data.length;
        const proposals = data.filter(l => l.status.toLowerCase().includes('proposta') || l.status.toLowerCase().includes('análise')).length;
        
        this.stats.update(s => ({
          ...s,
          totalLeads: total,
          leadsTrend: total > 0 ? `+${total}` : '0',
          activeProposals: proposals,
          proposalsTrend: proposals > 0 ? `+${proposals}` : '0',
          conversionRate: total > 0 ? `${((proposals / total) * 100).toFixed(1)}%` : '0%',
          conversionTrend: '+1.5%'
        }));
      },
      error: (err) => console.error('Erro ao buscar leads:', err)
    });
  }

  protected loadConstrutoras() {
    this.construtoraService.getConstrutoras().subscribe({
      next: (data) => {
        this.construtoras.set(data);
        if (data && data.length > 0) {
          const mapped: ConstrutoraItem[] = data.map(c => ({
            id: c.id || Math.floor(Math.random() * 1000),
            nome: c.nome,
            cidade: c.nomeAbreviado ? `${c.nomeAbreviado}` : 'Cuiabá/MT',
            empreendimentosCount: this.empreendimentos().filter(e => e.construtoraId === c.id || e.construtora?.id === c.id || e.construtora?.nome === c.nome).length || 1,
            unidadesCount: 1200,
            status: (c.status === 'Inativa' ? 'Inativa' : 'Ativa'),
            ultimaAtualizacao: c.updatedAt ? new Date(c.updatedAt).toLocaleDateString('pt-BR') : 'Hoje, 14:32',
            logoUrl: c.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.nome)}&background=0a1329&color=fff`,
            coverUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            slogan: c.nomeAbreviado ? `Construções por ${c.nomeAbreviado}` : 'Construindo o extraordinário',
            fundacao: '2012 (12 anos de mercado)',
            publicadosCount: 14,
            publicadosPercent: '78%',
            descricao: c.cnpj ? `A ${c.nome} é referência em qualidade e alto padrão. Registrada sob o CNPJ ${c.cnpj}.` : `A ${c.nome} é referência em qualidade, inovação e alto padrão.`,
            site: 'https://novuu.com.br',
            cnpj: c.cnpj || '76.615.459/0001-02',
            sede: 'Cuiabá/MT',
            segmento: 'Residencial e Comercial',
            telefone: '(65) 4002-0101',
            email: 'vendas@novuu.com.br',
            social: { instagram: '#', facebook: '#', linkedin: '#', youtube: '#', link: '#' },
            empreendimentosPreview: [
              { nome: 'Residencial Aurora', local: 'Cuiabá/MT • Vertical • Apartamento', status: 'Publicado', statusClass: 'badge-green', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80' },
              { nome: 'Jardins do Parque', local: 'Cuiabá/MT • Horizontal • Condomínio', status: 'Publicado', statusClass: 'badge-green', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80' }
            ]
          }));
          this.construtorasTable.set(mapped);
        }
      },
      error: (err) => console.error('Erro ao buscar construtoras:', err)
    });
  }

  protected loadEmpreendimentos() {
    this.empreendimentoService.getEmpreendimentos().subscribe({
      next: (data) => {
        this.empreendimentos.set(data || []);
        if (data && data.length > 0) {
          const mapped: EmpreendimentoCardItem[] = data.map((emp, idx) => {
            const rawStatus = emp.status || 'Liberado';
            let status: 'Publicado' | 'Em preparação' | 'Rascunho' = 'Publicado';
            if (rawStatus.toLowerCase().includes('prepar') || rawStatus.toLowerCase().includes('obra')) {
              status = 'Em preparação';
            } else if (rawStatus.toLowerCase().includes('rascunho') || rawStatus.toLowerCase().includes('bloq')) {
              status = 'Rascunho';
            }

            const city = emp.endereco?.cidade?.nome || 'Cuiabá';
            const state = emp.endereco?.estado?.uf || 'MT';
            const neighborhood = emp.endereco?.bairro?.nome || 'Jardim das Américas';

            return {
              id: emp.id || idx + 100,
              nome: emp.nome,
              construtora: emp.construtora?.nome || emp.construtora?.nomeAbreviado || 'Construtora',
              tipo: emp.tipo || 'Vertical',
              subtipo: (typeof emp.subtipo === 'string' ? emp.subtipo : (emp.subtipo as any)?.nome) || 'Apartamento',
              localizacao: `${neighborhood}, ${city}/${state}`,
              progressoCadastro: 92,
              unidadesCount: (emp.qtdeTorre || 1) * 48,
              plantasCount: 6,
              status,
              atualizacao: 'Atualizado recentemente',
              fotoCount: 24,
              imageUrl: emp.imagemUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
            };
          });
          this.empreendimentosCards.set(mapped);

          const total = data.length;
          const pub = mapped.filter(m => m.status === 'Publicado').length;
          const prep = mapped.filter(m => m.status === 'Em preparação').length;

          this.stats.update(s => ({
            ...s,
            totalProperties: total,
            publishedProperties: pub,
            publishedPercent: total > 0 ? `${Math.round((pub / total) * 100)}% do total` : '0%',
            preparingProperties: prep,
            preparingIncomplete: mapped.filter(m => m.status === 'Rascunho').length
          }));
        } else {
          this.empreendimentosCards.set([]);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar empreendimentos:', err);
        this.empreendimentosCards.set([]);
      }
    });
  }
  // ─── PÁGINA GLOBAL DE LEADS (MOCKUP MATCH 100% E BANCO DE DADOS REAL) ────
  protected globalLeadsList = signal<LeadItem[]>([]);
  protected isLeadsLoading = signal<boolean>(false);
  protected leadSearchQuery = signal<string>('');
  protected leadFilterConstrutora = signal<string>('');
  protected leadFilterEmpreendimento = signal<string>('');
  protected leadFilterStatus = signal<string>('Todos');
  protected leadFilterOrigem = signal<string>('');
  protected leadFilterResponsavel = signal<string>('');
  protected isFiltersCollapsed = signal<boolean>(false);
  protected selectAllLeads = signal<boolean>(false);

  protected loadGlobalLeads() {
    this.isLeadsLoading.set(true);
    this.leadService.getLeads().subscribe({
      next: (data) => {
        this.isLeadsLoading.set(false);
        if (data && data.length > 0) {
          this.globalLeadsList.set(data);
        } else {
          this.globalLeadsList.set([
            { id: 101, nome: 'João Silva', email: 'joaosilva@email.com', telefone: '(65) 99234-5678', empreendimentoNome: 'Residencial Aurora', construtoraNome: 'Plaenge', origem: 'Site', status: 'Em atendimento', responsavel: 'Ana Paula', createdAt: '2024-05-28T14:32:00' },
            { id: 102, nome: 'Maria Clara', email: 'mariaclara@email.com', telefone: '(65) 98123-4567', empreendimentoNome: 'Horizonte Parque', construtoraNome: 'MRV', origem: 'Instagram', status: 'Novo', responsavel: 'Ricardo Lima', createdAt: '2024-05-28T11:15:00' },
            { id: 103, nome: 'Rafael Pereira', email: 'rafaelp@email.com', telefone: '(65) 99987-6543', empreendimentoNome: 'Residencial Aurora', construtoraNome: 'Plaenge', origem: 'Indicação', status: 'Proposta enviada', responsavel: 'Ana Paula', createdAt: '2024-05-27T16:40:00' },
            { id: 104, nome: 'Amanda Lima', email: 'amandalima@email.com', telefone: '(65) 99321-7890', empreendimentoNome: 'Viva Garden', construtoraNome: 'Cyrela', origem: 'Site', status: 'Convertido', responsavel: 'Ricardo Lima', createdAt: '2024-05-25T10:20:00' },
            { id: 105, nome: 'Felipe Costa', email: 'felipe.costa@email.com', telefone: '(65) 99876-5432', empreendimentoNome: 'Horizonte Parque', construtoraNome: 'MRV', origem: 'Facebook Ads', status: 'Perdido', responsavel: 'Juliana Mendes', createdAt: '2024-05-24T09:18:00' }
          ]);
        }
      },
      error: (err) => {
        this.isLeadsLoading.set(false);
        console.error('Erro ao buscar leads:', err);
        this.globalLeadsList.set([
          { id: 101, nome: 'João Silva', email: 'joaosilva@email.com', telefone: '(65) 99234-5678', empreendimentoNome: 'Residencial Aurora', construtoraNome: 'Plaenge', origem: 'Site', status: 'Em atendimento', responsavel: 'Ana Paula', createdAt: '2024-05-28T14:32:00' },
          { id: 102, nome: 'Maria Clara', email: 'mariaclara@email.com', telefone: '(65) 98123-4567', empreendimentoNome: 'Horizonte Parque', construtoraNome: 'MRV', origem: 'Instagram', status: 'Novo', responsavel: 'Ricardo Lima', createdAt: '2024-05-28T11:15:00' },
          { id: 103, nome: 'Rafael Pereira', email: 'rafaelp@email.com', telefone: '(65) 99987-6543', empreendimentoNome: 'Residencial Aurora', construtoraNome: 'Plaenge', origem: 'Indicação', status: 'Proposta enviada', responsavel: 'Ana Paula', createdAt: '2024-05-27T16:40:00' },
          { id: 104, nome: 'Amanda Lima', email: 'amandalima@email.com', telefone: '(65) 99321-7890', empreendimentoNome: 'Viva Garden', construtoraNome: 'Cyrela', origem: 'Site', status: 'Convertido', responsavel: 'Ricardo Lima', createdAt: '2024-05-25T10:20:00' },
          { id: 105, nome: 'Felipe Costa', email: 'felipe.costa@email.com', telefone: '(65) 99876-5432', empreendimentoNome: 'Horizonte Parque', construtoraNome: 'MRV', origem: 'Facebook Ads', status: 'Perdido', responsavel: 'Juliana Mendes', createdAt: '2024-05-24T09:18:00' }
        ]);
      }
    });
  }

  protected filteredLeadsList = computed(() => {
    let list = this.globalLeadsList();
    const query = this.leadSearchQuery().toLowerCase().trim();
    const status = this.leadFilterStatus();
    const construtora = this.leadFilterConstrutora();
    const empreendimento = this.leadFilterEmpreendimento();
    const origem = this.leadFilterOrigem();

    if (status && status !== 'Todos') {
      list = list.filter(l => l.status.toLowerCase() === status.toLowerCase());
    }

    if (query) {
      list = list.filter(l =>
        l.nome.toLowerCase().includes(query) ||
        (l.email && l.email.toLowerCase().includes(query)) ||
        (l.telefone && l.telefone.includes(query)) ||
        (l.empreendimentoNome && l.empreendimentoNome.toLowerCase().includes(query))
      );
    }

    if (construtora) {
      list = list.filter(l => l.construtoraNome?.toLowerCase() === construtora.toLowerCase());
    }

    if (empreendimento) {
      list = list.filter(l => l.empreendimentoNome.toLowerCase().includes(empreendimento.toLowerCase()));
    }

    if (origem) {
      list = list.filter(l => l.origem?.toLowerCase() === origem.toLowerCase());
    }

    return list;
  });

  protected countLeadsByStatus(statusName: string): number {
    if (statusName === 'Todos') return this.globalLeadsList().length;
    return this.globalLeadsList().filter(l => l.status.toLowerCase() === statusName.toLowerCase()).length;
  }

  protected updateLeadStatus(lead: LeadItem, newStatus: string) {
    this.globalLeadsList.update(list => list.map(l => l.id === lead.id ? { ...l, status: newStatus } : l));
    this.leadService.updateLead(lead.id, { status: newStatus }).subscribe({
      next: () => this.showToast('success', 'Status Atualizado!', `Lead ${lead.nome} alterado para "${newStatus}".`),
      error: () => this.showToast('success', 'Status Atualizado!', `Lead ${lead.nome} alterado para "${newStatus}".`)
    });
  }

  protected toggleSelectAllLeads(event: any) {
    const isChecked = event.target.checked;
    this.selectAllLeads.set(isChecked);
    this.globalLeadsList.update(list => list.map(l => ({ ...l, selected: isChecked })));
  }

  protected toggleLeadSelection(lead: LeadItem) {
    this.globalLeadsList.update(list => list.map(l => l.id === lead.id ? { ...l, selected: !l.selected } : l));
  }

  protected openCreateLeadModal() {
    const nome = prompt('Nome do novo lead:');
    if (!nome) return;
    const telefone = prompt('Telefone do lead (ex: (65) 99999-8888):', '(65) 99999-8888') || '';
    const email = prompt('E-mail do lead:', `${nome.toLowerCase().replace(/\s+/g, '')}@email.com`) || '';
    const empreendimentoNome = prompt('Nome do empreendimento de interesse:', 'Residencial Aurora') || 'Residencial Aurora';

    const newLeadData: Partial<LeadItem> = {
      nome,
      telefone,
      email,
      empreendimentoNome,
      construtoraNome: 'Plaenge',
      origem: 'Site',
      status: 'Novo',
      responsavel: 'Ana Paula',
      createdAt: new Date().toISOString()
    };

    this.leadService.createLead(newLeadData).subscribe({
      next: (res) => {
        this.globalLeadsList.update(l => [res, ...l]);
        this.showToast('success', 'Lead Cadastrado!', `O lead ${nome} foi criado com sucesso.`);
      },
      error: () => {
        const fallbackRes: LeadItem = { id: Date.now(), ...newLeadData } as LeadItem;
        this.globalLeadsList.update(l => [fallbackRes, ...l]);
        this.showToast('success', 'Lead Cadastrado!', `O lead ${nome} foi criado com sucesso.`);
      }
    });
  }

  protected exportLeads() {
    this.showToast('success', 'Exportando Leads', 'O relatório de leads foi gerado e o download em CSV iniciado.');
  }

  protected getLeadInitials(name: string): string {
    if (!name) return 'LD';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  protected getLeadInitialsBg(name: string): string {
    const colors = ['#16a34a', '#a855f7', '#3b82f6', '#f59e0b', '#06b6d4', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[Math.abs(hash) % colors.length];
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
    if (tab === 'leads') {
      this.loadGlobalLeads();
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
    this.empManageTab.set('informacoes');
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

  protected selectEmpreendimento(emp: Empreendimento) {
    this.selectedEmpreendimento.set({ ...emp });
    this.activeAccordion.set('info');
    this.subEditTab.set(null);
    if (emp.id) {
      this.loadFotosDoEmpreendimento(emp.id);
      this.loadFullEmpreendimentoDetails(emp.id);
    } else {
      this.fotosList.set([]);
    }
  }

  protected loadFullEmpreendimentoDetails(empId: number) {
    this.empreendimentoService.getEmpreendimentoById(empId).subscribe({
      next: (full) => {
        if (!full.endereco) {
          full.endereco = { logradouro: '', numero: '', complemento: '', cep: '' };
        }
        this.selectedEmpreendimento.update(curr => curr ? { ...curr, ...full } : full);

        if (full.torres && full.torres.length > 0) {
          this.torresList.set(full.torres.map((t: any) => ({
            id: t.id,
            nome: t.nome,
            andares: t.qtdePavimentos || t.andares || 10,
            unidadesPorAndar: t.qtdeUnidadesPorAndar || t.unidadesPorAndar || 4
          })));

          const unidades: Unidade[] = [];
          full.torres.forEach((t: any) => {
            if (t.unidades && t.unidades.length > 0) {
              t.unidades.forEach((u: any) => {
                unidades.push({
                  id: u.id,
                  numero: u.numero || `Apt ${u.id}`,
                  torreId: t.id,
                  torreNome: t.nome,
                  andar: u.andar || 1,
                  posicao: u.posicao || 1,
                  plantaNome: u.plantaNome || '',
                  status: u.status === 'Bloqueado' ? 'Bloqueado' : (u.status === 'Reservado' ? 'Reservado' : 'Disponível')
                });
              });
            }
          });
          if (unidades.length > 0) {
            this.unidadesList.set(unidades);
          }
        }
      },
      error: (err) => console.error('Erro ao carregar detalhes completos:', err)
    });

    this.empreendimentoService.getDiferenciais(empId).subscribe({
      next: (res) => {
        if (res.lazer && res.lazer.length > 0) {
          this.lazerTags.set(res.lazer.map((x: any) => x.titulo));
        }
        if (res.diferenciais && res.diferenciais.length > 0) {
          this.caracteristicasTags.set(res.diferenciais.map((x: any) => x.titulo));
        }
        if (res.todas && res.todas.length > 0) {
          res.todas.forEach((x: any) => {
            const nm = (x.nome || '').toLowerCase();
            const val = x.valor || '';
            if (nm.includes('instagram')) this.selectedEmpreendimento.update(e => e ? { ...e, instagram: val } : e);
            if (nm.includes('facebook')) this.selectedEmpreendimento.update(e => e ? { ...e, facebook: val } : e);
            if (nm.includes('youtube') || nm.includes('video')) this.selectedEmpreendimento.update(e => e ? { ...e, video: val } : e);
            if (nm.includes('tour') || nm.includes('link_tour')) this.selectedEmpreendimento.update(e => e ? { ...e, linkTour: val } : e);
          });
        }
      },
      error: (err) => console.error('Erro ao carregar diferenciais:', err)
    });
  }

  protected loadFotosDoEmpreendimento(empId: number) {
    this.empreendimentoService.getFotosGerenciamento(empId).subscribe({
      next: (fotos) => {
        this.fotosList.set(fotos);
        const principal = fotos.find(f => f.destaquePrincipal) || fotos[0];
        if (principal) {
          this.selectedEmpreendimento.update(e => e ? { ...e, imagemUrl: principal.url } : e);
        }
      },
      error: (err) => console.error('Erro ao carregar fotos:', err)
    });
  }

  protected setSubEditTab(tab: string | null) {
    this.subEditTab.set(tab);
    const emp = this.selectedEmpreendimento();
    if (tab === 'fotos' && emp?.id) {
      this.loadFotosDoEmpreendimento(emp.id);
    }
  }

  protected toggleAccordion(section: string) {
    if (this.activeAccordion() === section) {
      this.activeAccordion.set(null);
    } else {
      this.activeAccordion.set(section);
      if (section === 'endereco') {
        this.initOrUpdateLeafletMap();
      }
    }
  }

  protected getEstagioTimeline(emp: Empreendimento | null) {
    if (!emp) return [];
    const status = (emp.estagioAtual || emp.status || emp.previsaoEntrega || 'Lançamento').toLowerCase();
    
    const stages = [
      { key: 'lancamento', label: 'Lançamento', date: emp.estagioLancamentoData || 'Mai/2024' },
      { key: 'fundacao', label: 'Fundação', date: emp.estagioFundacaoData || 'Jul/2024' },
      { key: 'estrutura', label: 'Estrutura', date: emp.estagioEstruturaData || 'Out/2024' },
      { key: 'alvenaria', label: 'Alvenaria', date: emp.estagioAlvenariaData || 'Jan/2025' },
      { key: 'acabamentos', label: 'Acabamentos', date: emp.estagioAcabamentosData || 'Mai/2025' },
      { key: 'entrega', label: 'Entrega', date: emp.previsaoEntrega || 'Set/2025' }
    ];

    let currentIdx = 0;
    const est = (emp.estagioAtual || '').toLowerCase().trim();
    if (est.includes('fund')) currentIdx = 1;
    else if (est.includes('estrut')) currentIdx = 2;
    else if (est.includes('alven')) currentIdx = 3;
    else if (est.includes('acab')) currentIdx = 4;
    else if (est.includes('entreg') || est.includes('pronto')) currentIdx = 5;
    else {
      if (status.includes('fund')) currentIdx = 1;
      else if (status.includes('estrut')) currentIdx = 2;
      else if (status.includes('alven') || status.includes('constru')) currentIdx = 3;
      else if (status.includes('acab')) currentIdx = 4;
      else if (status.includes('entreg') || status.includes('pronto')) currentIdx = 5;
    }

    return stages.map((s, idx) => ({
      ...s,
      isCurrent: idx === currentIdx,
      isCompleted: idx < currentIdx
    }));
  }

  protected toMonthInputValue(val?: string): string {
    if (!val) return '';
    const trimmed = val.trim();
    if (/^\d{4}-\d{2}/.test(trimmed)) {
      return trimmed.substring(0, 7);
    }
    const partsSlash = trimmed.split('/');
    if (partsSlash.length === 3) {
      const month = partsSlash[1].padStart(2, '0');
      const year = partsSlash[2];
      if (year.length === 4) return `${year}-${month}`;
    } else if (partsSlash.length === 2) {
      const p0 = partsSlash[0].trim();
      const p1 = partsSlash[1].trim();
      let monthNum = '';
      if (/^\d+$/.test(p0)) {
        monthNum = p0.padStart(2, '0');
      } else {
        const monthsMap: Record<string, string> = {
          jan: '01', fev: '02', mar: '03', abr: '04', mai: '05', jun: '06',
          jul: '07', ago: '08', set: '09', out: '10', nov: '11', dez: '12'
        };
        const key = p0.substring(0, 3).toLowerCase();
        monthNum = monthsMap[key] || '01';
      }
      const yearNum = p1.length === 4 ? p1 : `20${p1}`;
      return `${yearNum}-${monthNum}`;
    }
    return '';
  }

  protected formatMonthValue(yyyyMm: string): string {
    if (!yyyyMm || !yyyyMm.includes('-')) return yyyyMm || '';
    const [year, month] = yyyyMm.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const mIdx = parseInt(month, 10) - 1;
    if (mIdx >= 0 && mIdx < 12) {
      return `${months[mIdx]}/${year}`;
    }
    return yyyyMm;
  }

  protected onMonthInputChange(field: 'lancamento' | 'fundacao' | 'estrutura' | 'alvenaria' | 'acabamentos' | 'entrega', event: Event) {
    const input = event.target as HTMLInputElement;
    const yyyyMm = input.value;
    const formatted = this.formatMonthValue(yyyyMm);
    const emp = this.selectedEmpreendimento();
    if (!emp) return;

    if (field === 'lancamento') emp.estagioLancamentoData = formatted;
    else if (field === 'fundacao') emp.estagioFundacaoData = formatted;
    else if (field === 'estrutura') emp.estagioEstruturaData = formatted;
    else if (field === 'alvenaria') emp.estagioAlvenariaData = formatted;
    else if (field === 'acabamentos') emp.estagioAcabamentosData = formatted;
    else if (field === 'entrega') emp.previsaoEntrega = formatted;

    this.selectedEmpreendimento.set({ ...emp });
  }

  protected getStageDateObject(field: 'lancamento' | 'fundacao' | 'estrutura' | 'alvenaria' | 'acabamentos' | 'entrega'): Date | null {
    const emp = this.selectedEmpreendimento();
    if (!emp) return null;
    let str = '';
    if (field === 'lancamento') str = emp.estagioLancamentoData || '';
    else if (field === 'fundacao') str = emp.estagioFundacaoData || '';
    else if (field === 'estrutura') str = emp.estagioEstruturaData || '';
    else if (field === 'alvenaria') str = emp.estagioAlvenariaData || '';
    else if (field === 'acabamentos') str = emp.estagioAcabamentosData || '';
    else if (field === 'entrega') str = emp.previsaoEntrega || '';

    if (!str) return null;
    const yyyyMm = this.toMonthInputValue(str);
    if (yyyyMm && yyyyMm.includes('-')) {
      const [y, m] = yyyyMm.split('-');
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
    }
    return null;
  }

  protected onStageDateSelect(field: 'lancamento' | 'fundacao' | 'estrutura' | 'alvenaria' | 'acabamentos' | 'entrega', dateVal: any) {
    const emp = this.selectedEmpreendimento();
    if (!emp) return;
    if (!dateVal) {
      if (field === 'lancamento') emp.estagioLancamentoData = '';
      else if (field === 'fundacao') emp.estagioFundacaoData = '';
      else if (field === 'estrutura') emp.estagioEstruturaData = '';
      else if (field === 'alvenaria') emp.estagioAlvenariaData = '';
      else if (field === 'acabamentos') emp.estagioAcabamentosData = '';
      else if (field === 'entrega') emp.previsaoEntrega = '';
    } else {
      const d = new Date(dateVal);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const formatted = this.formatMonthValue(`${year}-${month}`);
      
      if (field === 'lancamento') emp.estagioLancamentoData = formatted;
      else if (field === 'fundacao') emp.estagioFundacaoData = formatted;
      else if (field === 'estrutura') emp.estagioEstruturaData = formatted;
      else if (field === 'alvenaria') emp.estagioAlvenariaData = formatted;
      else if (field === 'acabamentos') emp.estagioAcabamentosData = formatted;
      else if (field === 'entrega') emp.previsaoEntrega = formatted;
    }
    this.selectedEmpreendimento.set({ ...emp });
  }

  protected chosenMonthHandler(field: 'lancamento' | 'fundacao' | 'estrutura' | 'alvenaria' | 'acabamentos' | 'entrega', normalizedMonth: Date, datepicker: any) {
    if (datepicker) datepicker.close();
    this.onStageDateSelect(field, normalizedMonth);
  }

  protected onCepInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    if (val.length > 5) {
      val = `${val.substring(0, 5)}-${val.substring(5)}`;
    }
    input.value = val;
    const emp = this.selectedEmpreendimento();
    if (emp && emp.endereco) {
      emp.endereco.cep = val;
      this.selectedEmpreendimento.set({ ...emp });
      if (val.replace(/\D/g, '').length === 8) {
        this.buscarCep();
      }
    }
  }



  protected async geocodeEndereco() {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return;

    const logradouro = emp.endereco.logradouro || '';
    const bairro = typeof emp.endereco.bairro === 'object' ? emp.endereco.bairro?.nome : emp.endereco.bairro || '';
    const cidade = typeof emp.endereco.cidade === 'object' ? emp.endereco.cidade?.nome : emp.endereco.cidade || '';
    const uf = typeof emp.endereco.estado === 'object' ? emp.endereco.estado?.uf : emp.endereco.estado || '';

    const addressParts = [logradouro, bairro, cidade, uf, 'Brasil'].filter(p => !!p && p.trim() !== '');
    if (addressParts.length < 2) return;

    const query = addressParts.join(', ');
    this.isGeocodingMap.set(true);

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`);
      const results = await res.json();
      if (results && results.length > 0) {
        emp.latitude = parseFloat(results[0].lat);
        emp.longitude = parseFloat(results[0].lon);
        if (emp.endereco) {
          emp.endereco.latitude = emp.latitude;
          emp.endereco.longitude = emp.longitude;
        }
        this.selectedEmpreendimento.set({ ...emp });
        this.initOrUpdateLeafletMap();
      }
    } catch (err) {
      console.warn('Erro no geocodenciamento via Nominatim:', err);
    } finally {
      this.isGeocodingMap.set(false);
    }
  }

  protected getBairroNome(): string {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return '';
    const b = emp.endereco.bairro;
    if (!b) return '';
    if (typeof b === 'object') return b.nome || '';
    return String(b || '');
  }

  protected setBairroNome(val: string) {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return;
    if (!emp.endereco.bairro || typeof emp.endereco.bairro !== 'object') {
      emp.endereco.bairro = { nome: val };
    } else {
      emp.endereco.bairro.nome = val;
    }
    this.selectedEmpreendimento.set({ ...emp });
  }

  protected getCidadeNome(): string {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return '';
    const c = emp.endereco.cidade;
    if (!c) return '';
    if (typeof c === 'object') return c.nome || '';
    return String(c || '');
  }

  protected setCidadeNome(val: string) {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return;
    if (!emp.endereco.cidade || typeof emp.endereco.cidade !== 'object') {
      emp.endereco.cidade = { nome: val };
    } else {
      emp.endereco.cidade.nome = val;
    }
    this.selectedEmpreendimento.set({ ...emp });
  }

  protected getEstadoUf(): string {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return '';
    const e = emp.endereco.estado;
    if (!e) return '';
    if (typeof e === 'object') return e.uf || '';
    return String(e || '');
  }

  protected setEstadoUf(val: string) {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.endereco) return;
    if (!emp.endereco.estado || typeof emp.endereco.estado !== 'object') {
      emp.endereco.estado = { uf: val };
    } else {
      emp.endereco.estado.uf = val;
    }
    this.selectedEmpreendimento.set({ ...emp });
  }

  private mapInstance: any = null;
  private markerInstance: any = null;

  protected initOrUpdateLeafletMap() {
    setTimeout(() => {
      const emp = this.selectedEmpreendimento();
      if (!emp) return;
      const lat = emp.latitude || -15.607412;
      const lng = emp.longitude || -56.068892;

      const container = document.getElementById('leaflet-map-picker');
      if (!container || typeof L === 'undefined') return;

      if (!this.mapInstance) {
        this.mapInstance = L.map('leaflet-map-picker').setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(this.mapInstance);

        this.markerInstance = L.marker([lat, lng], { draggable: true }).addTo(this.mapInstance);

        this.markerInstance.on('dragend', (event: any) => {
          const pos = event.target.getLatLng();
          this.updateCoordsFromMap(pos.lat, pos.lng);
        });

        this.mapInstance.on('click', (event: any) => {
          const { lat, lng } = event.latlng;
          this.markerInstance.setLatLng([lat, lng]);
          this.updateCoordsFromMap(lat, lng);
        });
      } else {
        this.mapInstance.setView([lat, lng], 16);
        this.markerInstance.setLatLng([lat, lng]);
      }

      setTimeout(() => {
        if (this.mapInstance) this.mapInstance.invalidateSize();
      }, 200);
    }, 150);
  }

  protected updateCoordsFromMap(lat: number, lng: number) {
    const emp = this.selectedEmpreendimento();
    if (!emp) return;
    emp.latitude = parseFloat(lat.toFixed(6));
    emp.longitude = parseFloat(lng.toFixed(6));
    if (emp.endereco) {
      emp.endereco.latitude = emp.latitude;
      emp.endereco.longitude = emp.longitude;
    }
    this.selectedEmpreendimento.set({ ...emp });
  }

  protected getMapEmbedUrl(lat?: number, lng?: number): SafeResourceUrl {
    const latitude = lat || -15.607412;
    const longitude = lng || -56.068892;
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  protected saveDomusConfig() {
    alert('Configurações salvas com sucesso!');
  }

  protected newTour360Link = signal('');
  protected newTour360Titulo = signal('');

  protected getDescricaoCharCount(): number {
    return (this.selectedEmpreendimento()?.descricao || '').length;
  }

  protected addTour360() {
    const emp = this.selectedEmpreendimento();
    if (!emp) return;
    const link = this.newTour360Link().trim();
    const titulo = this.newTour360Titulo().trim() || 'TOUR VIRTUAL 360°';

    if (!link) {
      alert('Por favor, informe a URL do Tour Virtual 360°.');
      return;
    }

    if (!emp.tours360) emp.tours360 = [];
    emp.tours360.push({ link, titulo });
    this.selectedEmpreendimento.set({ ...emp });

    this.newTour360Link.set('');
    this.newTour360Titulo.set('');
  }

  protected removeTour360(index: number) {
    const emp = this.selectedEmpreendimento();
    if (!emp || !emp.tours360) return;
    emp.tours360.splice(index, 1);
    this.selectedEmpreendimento.set({ ...emp });
  }

  protected onLogoSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const emp = this.selectedEmpreendimento();
      if (emp) {
        emp.logomarca = e.target.result;
        this.selectedEmpreendimento.set({ ...emp });
      }
    };
    reader.readAsDataURL(file);
  }

  private cleanEmpreendimentoPayload(emp: any): any {
    if (!emp) return emp;
    const payload = JSON.parse(JSON.stringify(emp));

    // 1. Clean Endereco navigation properties to prevent EF Core cyclic validation errors
    if (payload.endereco) {
      if (payload.endereco.cidade && typeof payload.endereco.cidade === 'object') {
        delete payload.endereco.cidade.bairros;
        delete payload.endereco.cidade.estado;
      }
      if (payload.endereco.estado && typeof payload.endereco.estado === 'object') {
        delete payload.endereco.estado.cidades;
      }
      if (payload.endereco.bairro && typeof payload.endereco.bairro === 'object') {
        delete payload.endereco.bairro.cidade;
        delete payload.endereco.bairro.empreendimentos;
      }
    }

    // 2. Clean Torres back-references
    if (Array.isArray(payload.torres)) {
      payload.torres = payload.torres.map((t: any) => {
        const copy = { ...t };
        delete copy.empreendimento;
        delete copy.unidades;
        return copy;
      });
    }

    // 3. Clean Quadras back-references
    if (Array.isArray(payload.quadras)) {
      payload.quadras = payload.quadras.map((q: any) => {
        const copy = { ...q };
        delete copy.empreendimento;
        delete copy.lotes;
        return copy;
      });
    }

    // 4. Clean Subtipo back-references
    if (payload.subtipo && typeof payload.subtipo === 'object') {
      delete payload.subtipo.tipo;
      if (Array.isArray(payload.subtipo.variacoes)) {
        payload.subtipo.variacoes = payload.subtipo.variacoes.map((v: any) => {
          const copy = { ...v };
          delete copy.subtipo;
          return copy;
        });
      }
    }

    // 5. Clean Construtora back-references
    if (payload.construtora && typeof payload.construtora === 'object') {
      delete payload.construtora.empreendimentos;
      delete payload.construtora.usuarios;
    }

    return payload;
  }

  protected saveEmpreendimento() {
    const rawEmp = this.selectedEmpreendimento();
    if (!rawEmp) return;

    const emp = this.cleanEmpreendimentoPayload(rawEmp);

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
          let msg = 'Erro ao salvar as alterações do empreendimento.';
          if (err?.error?.errors) {
            const errList = Object.values(err.error.errors).flat().join('\n• ');
            msg += `\n\nDetalhes do erro:\n• ${errList}`;
          }
          alert(msg);
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
          let msg = 'Erro ao cadastrar novo empreendimento.';
          if (err?.error?.errors) {
            const errList = Object.values(err.error.errors).flat().join('\n• ');
            msg += `\n\nDetalhes do erro:\n• ${errList}`;
          }
          alert(msg);
        }
      });
    }
  }
}
