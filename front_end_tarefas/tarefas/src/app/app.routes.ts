import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastrar', pathMatch: 'full' },
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./auth/pages/register-user/register-user.component')
        .then((m) => m.RegisterUserComponent),
  },
  {
    path: 'tarefas',
    loadComponent: () =>
      import('./tasks/pages/tasks-dashboard/tasks-dashboard.component')
        .then((m) => m.TasksDashboardComponent),
  },
  {
    path: 'obrigacoes/cadastrar',
    loadComponent: () =>
      import('./obligations/pages/register-obligation/register-obligation.component')
        .then(m => m.RegisterObligationComponent),
  }
];
