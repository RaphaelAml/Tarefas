import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios$ = new BehaviorSubject<Usuario[]>([]);
  private lastId = 0;

  criarUsuario(usuario: Omit<Usuario, 'id'>): Usuario {
    const newUsuario: Usuario = {
      ...usuario,
      id: ++this.lastId,
    };
    this.usuarios$.next([...this.usuarios$.value, newUsuario]);
    return newUsuario;
  }

  verificarLogin(
    email: string,
    senha: string
  ): Observable<Usuario | undefined> {
    return this.usuarios$.pipe(
      map((usuarios) =>
        usuarios.find((u) => u.email === email && u.senha === senha)
      )
    );
  }

  getUsuario(id: number): Observable<Usuario | undefined> {
    return this.usuarios$.pipe(
      map((usuarios) => usuarios.find((u) => u.id === id))
    );
  }

  atualizarUsuario(id: number, changes: Partial<Usuario>): void {
    const usuarios = this.usuarios$.value.map((u) =>
      u.id === id ? { ...u, ...changes } : u
    );
    this.usuarios$.next(usuarios);
  }
}
