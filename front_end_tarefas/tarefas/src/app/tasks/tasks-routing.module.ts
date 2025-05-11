import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardComponent } from './pages/tasks-dashboard/tasks-dashboard.component';

const routes: Routes = [
  { path: 'tarefas', component: TasksDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
