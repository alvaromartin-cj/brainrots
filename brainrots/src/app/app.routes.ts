import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  // ============================================
  // Rutas públicas (sin layout)
  // ============================================
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  // ============================================
  // Rutas privadas (con layout)
  // ============================================
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
      // Agregar más rutas privadas: /brainrots, /categorias, /configuracion
    ]
  }
];
