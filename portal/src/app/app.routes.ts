import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'empreendimento/:id', component: DetalheComponent },
  {
    path: 'cliente',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cliente/layout.component').then(m => m.ClienteLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/cliente/perfil/perfil.component').then(m => m.PerfilComponent) },
      { path: 'favoritos', loadComponent: () => import('./pages/cliente/favoritos/favoritos.component').then(m => m.FavoritosComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
