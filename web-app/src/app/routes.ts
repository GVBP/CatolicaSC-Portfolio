import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SimulacoesComponent } from './simulacoes/simulacoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LogoutComponent } from './logout/logout.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, title: 'login' },
  { path: 'dashboard', component: DashboardComponent, title: 'dashboard'},
  { path: 'transacoes', component: TransacoesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'simulacoes', component: SimulacoesComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'logout', component: LogoutComponent }
];
export default routeConfig;