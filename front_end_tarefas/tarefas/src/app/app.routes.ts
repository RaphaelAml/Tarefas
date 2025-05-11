import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastrar', pathMatch: 'full' },
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./components/register-user/register-user.component').then(
        (m) => m.RegisterUserComponent
      ),
  },
  {
    path: 'tarefas',
    loadComponent: () =>
      import('./components/tasks-dashboard/tasks-dashboard.component').then(
        (m) => m.TasksDashboardComponent
      ),
  },
  {
    path: 'obrigacoes/cadastrar',
    loadComponent: () =>
      import(
        './components/register-obrigation/register-obrigation.component'
      ).then((m) => m.RegisterObrigationComponent),
  },
];
