import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Esfera } from '../../models/obrigacao/esfera.enum';
import { StatusAtiva } from '../../models/obrigacao/status-ativa.enum';
import { TipoObrigacao } from '../../models/obrigacao/tipo-obrigacao.enum';
import { ObrigacaoService } from '../../services/obrigacao.service';
import { TarefaService } from '../../services/tarefa.service';
import { StatusTarefa } from '../../models/tarefa/status-tarefa.enum';
import { Visibilidade } from '../../models/tarefa/visibilidade.enum';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';





@Component({
  selector: 'app-register-obrigation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './register-obrigation.component.html',
  styleUrls: ['./register-obrigation.component.css'],
})
export class RegisterObrigationComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private obrigacaoService: ObrigacaoService,
    private tarefaService: TarefaService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      departamento: ['', Validators.required],
      tipoObrigacao: ['', Validators.required],
      esfera: ['', Validators.required],
      vencimento: [null, Validators.required],
      antecipa: [false],
      prorroga: [false],
      statusAtivaNao: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const novaObrigacao = {
        nome: formValue.nome,
        tipoObrigacao: formValue.tipoObrigacao as TipoObrigacao,
        esfera: formValue.esfera as Esfera,
        antecipa: formValue.antecipa,
        prorroga: formValue.prorroga,
        statusAtivaNao: formValue.statusAtivaNao as StatusAtiva,
        usuarioId: 1,
      };

      const obrigacaoCriada = this.obrigacaoService.criarObrigacao(novaObrigacao);


      // Criação automática da tarefa com base na obrigação
      this.tarefaService.criarTarefa({
        titulo: formValue.nome,
        descricao: `Tarefa da obrigação: ${formValue.nome}`,
        dataVencimento: formValue.vencimento,
        status: StatusTarefa.P,
        visibilidade: Visibilidade.C,
        statusAtivaNao: formValue.statusAtivaNao,
        usuarioId: 1,
        obrigacaoId: obrigacaoCriada.id,
        tipoObrigacao: formValue.tipoObrigacao,
        esfera: formValue.esfera,
        antecipa: formValue.antecipa,
        prorroga: formValue.prorroga,
        departamento: formValue.departamento,
      });



      this.form.reset();
    }
  }

  cancelar() {
    this.form.reset();
  }
}
