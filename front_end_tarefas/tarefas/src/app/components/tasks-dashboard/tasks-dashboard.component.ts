import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatusTarefa } from '../../models/tarefa/status-tarefa.enum';
import { TarefaService } from '../../services/tarefa.service';
import { FilterByStatusPipe } from './components/filterByStatus';
import { MatMenuModule } from '@angular/material/menu';



@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FilterByStatusPipe,
    MatMenuModule
],
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css'],
})
export class TasksDashboardComponent implements OnInit {
  tarefas: any[] = [];
  tarefaSelecionada: any = null;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  private carregarTarefas() {

    // Substitue 1 pelo ID do usuario logado
    this.tarefaService.getTarefasByUsuario(1).subscribe((tarefas) => {
      this.tarefas = tarefas.map((t) => ({
        ...t,
        status: this.mapearStatus(t.status),
        vencimento: new Date(t.dataVencimento).toLocaleDateString(),
      }));
    });
  }

  alternarStatus(tarefa: any) {
    const novoStatus =
      tarefa.status === 'concluido' ? StatusTarefa.P : StatusTarefa.C;

    this.tarefaService.atualizarTarefa(tarefa.id, { status: novoStatus });
  }

  atualizarStatus(tarefa: any, novoStatus: 'pendente' | 'andamento' | 'concluido') {
    const statusMap = {
      pendente: StatusTarefa.P,
      andamento: StatusTarefa.A,
      concluido: StatusTarefa.C,
    };
  
    this.tarefaService.atualizarTarefa(tarefa.id, {
      status: statusMap[novoStatus],
    });
  
    this.carregarTarefas();
  }
  
  

  private mapearStatus(status: StatusTarefa): string {
    return {
      [StatusTarefa.C]: 'concluido',
      [StatusTarefa.P]: 'pendente',
      [StatusTarefa.A]: 'andamento',
    }[status];
  }
}

