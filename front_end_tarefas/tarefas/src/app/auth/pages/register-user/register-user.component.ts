import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule

  ],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})


export class RegisterUserComponent {
togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
  form: FormGroup;
  loading = false;
hidePassword: any;


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      genero: ['M'],
      tipoUsuario: ['CL'],
    });
  }
  
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // ativa mensagens
      return;
    }
  
    this.loading = true;
  
    setTimeout(() => {
      this.loading = false;
  
      // Simula sucesso
      this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  
      this.form.reset();
    }, 1500); // simula chamada de API
  }
  


}
