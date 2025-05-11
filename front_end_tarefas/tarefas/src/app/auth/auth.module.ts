import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./pages/register-user/register-user.component')
        .then((m) => m.RegisterUserComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthModule { }
