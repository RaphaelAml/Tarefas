import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Obrigacao } from '../models/obrigacao/obrigacao.model';
import { Tarefa } from '../models/tarefa/tarefa.model';
import { Genero } from '../models/usuario/generos.enum';
import { TipoUsuario } from '../models/usuario/tipo-usuario.enum';
import { Usuario } from '../models/usuario/usuario.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const usuarios: Usuario[] = [
      {
        id: 1,
        nome: 'Admin',
        email: 'admin@email.com',
        senha: '123456',
        fotoPerfil: '',
        genero: Genero.M,
        tipoUsuario: TipoUsuario.A,
        tarefas: [],
        obrigacoes: [],
      },
    ];

    const obrigacoes: Obrigacao[] = [];
    const tarefas: Tarefa[] = [];

    return { usuarios, obrigacoes, tarefas };
  }

  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((i) => i.id)) + 1
      : 1;
  }
}
