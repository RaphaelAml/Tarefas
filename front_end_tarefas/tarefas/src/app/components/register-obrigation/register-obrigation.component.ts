import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';



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
  ],
  templateUrl: './register-obrigation.component.html',
  styleUrls: ['./register-obrigation.component.css'],
})
export class RegisterObrigationComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      tipoObrigacao: ['', Validators.required],
      esfera: ['', Validators.required],
      antecipa: [false],
      prorroga: [false],
      statusAtivaNao: ['S'],
      departamento: ['', Validators.required],
      vencimento: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Obrigação cadastrada:', this.form.value);

    this.snackBar.open('Obrigação cadastrada com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.form.reset();
    this.router.navigate(['/tarefas']);
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }
}
