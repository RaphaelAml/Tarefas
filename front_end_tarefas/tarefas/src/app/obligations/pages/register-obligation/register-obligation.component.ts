import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-register-obligation',
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
    MatNativeDateModule
  ],
  templateUrl: './register-obligation.component.html',
  styleUrls: ['./register-obligation.component.css']
})
export class RegisterObligationComponent {
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
      vencimento: [null, Validators.required]
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
      verticalPosition: 'top'
    });

    this.form.reset();
    this.router.navigate(['/tarefas']);
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }

}
