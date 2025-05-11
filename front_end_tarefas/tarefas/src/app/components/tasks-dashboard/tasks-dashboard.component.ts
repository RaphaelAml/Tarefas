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
  ],
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css'],
})
export class TasksDashboardComponent implements OnInit {
  tarefas: any[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  private carregarTarefas() {
    // Substituir 1 pelo ID do usuário logado
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

  private mapearStatus(status: StatusTarefa): string {
    return {
      [StatusTarefa.C]: 'concluido',
      [StatusTarefa.P]: 'pendente',
      [StatusTarefa.A]: 'andamento',
    }[status];
  }
}
// export class TasksDashboardComponent {

//   constructor(private dialog: MatDialog) {}

//   meses: string[] = [
//     'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
//     'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
//     'Novembro', 'Dezembro'
//   ];

//   mesSelecionado: string = 'Maio';
//   anoSelecionado: number = new Date().getFullYear();

//   empresas = [
//     {
//       nome: 'Empresa A',
//       tarefas: [
//         { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
//         { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
//         { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
//         { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
//         { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
//         { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
//       ]
//     },
//     {
//       nome: 'Empresa B',
//       tarefas: [
//         { nome: 'ISS', vencimento: '12/05', tipo: 'Imposto', status: 'pendente' },
//         { nome: 'SPED Contribuições', vencimento: '20/05', tipo: 'Declaração', status: 'concluido' },
//         { nome: 'DAS', vencimento: '25/05', tipo: 'Imposto', status: 'pendente' },
//         { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
//         { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
//         { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
//       ]
//     }
//   ];

//   marcarComoConcluido(tarefa: any) {
//     tarefa.status = 'concluido';
//   }

//   alternarStatus(tarefa: any) {
//     tarefa.status = tarefa.status === 'concluido' ? 'pendente' : 'concluido';
//   }

// }
