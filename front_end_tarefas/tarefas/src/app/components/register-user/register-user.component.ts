import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

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
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  form: FormGroup;
  hidePassword = true;
  loading = false;
  fotoPreview: string | ArrayBuffer | null = null;
  fotoArquivo: File | null = null;
  avatarAnimando = false; 

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
      genero: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
    }, { validators: this.senhasIguaisValidator });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { confirmarSenha, ...userData } = this.form.value;

      // Exemplo: converter foto para base64 se quiser salvar como string
      let fotoPerfil = '';
      if (this.fotoPreview && typeof this.fotoPreview === 'string') {
        fotoPerfil = this.fotoPreview;
      }

      this.usuarioService.criarUsuario({
        ...userData,
        fotoPerfil,
      });

      this.loading = false;
      this.form.reset();
      this.fotoPreview = null;
      this.fotoArquivo = null;
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Foto
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fotoArquivo = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.fotoPreview = null;

      };
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.form.reset();
    this.fotoPreview = null;
    this.fotoArquivo = null;
    this.snackBar.open('Cadastro cancelado.', 'Fechar', { duration: 2000 });
  }


  // Validador de senhas
  senhasIguaisValidator(group: AbstractControl) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }
}
