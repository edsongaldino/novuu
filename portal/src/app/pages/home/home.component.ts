import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpreendimentoService, AutocompleteResult } from '../../core/services/empreendimento.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private router = inject(Router);
  private empreendimentoService = inject(EmpreendimentoService);

  protected searchQuery = signal('');
  protected autocompleteResults = signal<AutocompleteResult[]>([]);
  protected showDropdown = signal(false);

  protected onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    
    if (value.trim().length > 1) {
      this.empreendimentoService.getAutocomplete(value).subscribe({
        next: (results) => {
          this.autocompleteResults.set(results);
          this.showDropdown.set(results.length > 0);
        },
        error: (err) => console.error('Erro ao buscar autocomplete:', err)
      });
    } else {
      this.autocompleteResults.set([]);
      this.showDropdown.set(false);
    }
  }

  protected selectSuggestion(item: AutocompleteResult) {
    this.showDropdown.set(false);
    if (item.tipo === 'Empreendimento') {
      this.router.navigate(['/empreendimento', item.id]);
    } else if (item.tipo === 'Cidade') {
      this.router.navigate(['/busca'], { queryParams: { cidadeId: item.id } });
    } else if (item.tipo === 'Bairro') {
      this.router.navigate(['/busca'], { queryParams: { bairroId: item.id } });
    } else if (item.tipo === 'Construtora') {
      this.router.navigate(['/busca'], { queryParams: { construtoraId: item.id } });
    }
  }

  protected submitSearch(event?: Event) {
    if (event) event.preventDefault();
    const q = this.searchQuery().trim();
    if (q) {
      this.router.navigate(['/busca'], { queryParams: { query: q } });
    }
  }

  protected selectSuggestionText(text: string) {
    if (text.includes('Américas')) {
      this.router.navigate(['/busca'], { queryParams: { query: 'Jardim das Américas' } });
    } else if (text.includes('1 milhão')) {
      this.router.navigate(['/busca'], { queryParams: { precoMaximo: 1000000 } });
    } else if (text.includes('Plaenge')) {
      this.router.navigate(['/busca'], { queryParams: { query: 'Plaenge' } });
    } else {
      this.router.navigate(['/busca'], { queryParams: { query: text } });
    }
  }

  protected hideDropdown() {
    setTimeout(() => {
      this.showDropdown.set(false);
    }, 200);
  }
}
