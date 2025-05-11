import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarObrigationComponent } from '../../components/calendar-obrigation/calendar-obrigation.component';


@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    CalendarObrigationComponent
  ],
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css']
})
export class TasksDashboardComponent {

  constructor(private dialog: MatDialog) {}


  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
    'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
    'Novembro', 'Dezembro'
  ];
  
  mesSelecionado: string = 'Maio';
  anoSelecionado: number = new Date().getFullYear();
  

  empresas = [
    {
      nome: 'Empresa A',
      tarefas: [
        { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
        { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
        { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
        { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
        { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
        { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
      ]
    },
    {
      nome: 'Empresa B',
      tarefas: [
        { nome: 'ISS', vencimento: '12/05', tipo: 'Imposto', status: 'pendente' },
        { nome: 'SPED Contribuições', vencimento: '20/05', tipo: 'Declaração', status: 'concluido' },
        { nome: 'DAS', vencimento: '25/05', tipo: 'Imposto', status: 'pendente' },
        { nome: 'DCTF', vencimento: '10/05', tipo: 'Declaração', status: 'pendente' },
        { nome: 'ICMS', vencimento: '15/05', tipo: 'Imposto', status: 'pendente' },
        { nome: 'IRPJ', vencimento: '20/05', tipo: 'Imposto', status: 'concluido' },
      ]
    }
  ];

  marcarComoConcluido(tarefa: any) {
    tarefa.status = 'concluido';
  }

  alternarStatus(tarefa: any) {
    tarefa.status = tarefa.status === 'concluido' ? 'pendente' : 'concluido';
  }


}
