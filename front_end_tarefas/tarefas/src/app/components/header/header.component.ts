import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
[x: string]: any;
  user?: Usuario;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    this.usuarioService.getUsuario(1).subscribe((usuario) => {
      if (usuario) {
        this.user = usuario;
      }
    });
  }

  getDepartamento(): string {
    if (!this.user) return '';
    return (
      {
        C: 'Cliente',
        A: 'Administrador',
        CO: 'Contador',
      }[this.user.tipoUsuario] || ''
    );
  }
}
