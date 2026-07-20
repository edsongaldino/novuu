import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'empreendimento/:id', component: DetalheComponent },
  { path: '**', redirectTo: '' }
];
