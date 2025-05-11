import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
  { path: 'cadastrar', component: RegisterUserComponent }, // se for standalone, precisa importar como abaixo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
