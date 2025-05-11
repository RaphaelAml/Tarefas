import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StatusTarefa } from '../models/tarefa/status-tarefa.enum';
import { Tarefa } from '../models/tarefa/tarefa.model';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private tarefas$ = new BehaviorSubject<Tarefa[]>([]);
  private lastId = 0;

  criarTarefa(tarefa: Omit<Tarefa, 'id'>): Tarefa {
    const newTarefa: Tarefa = {
      ...tarefa,
      id: ++this.lastId,
    };
    this.tarefas$.next([...this.tarefas$.value, newTarefa]);
    return newTarefa;
  }

  getTarefasByUsuario(usuarioId: number): Observable<Tarefa[]> {
    return this.tarefas$.pipe(
      map((tarefas) => tarefas.filter((t) => t.usuarioId === usuarioId))
    );
  }

  concluirTarefa(id: number): void {
    const tarefas = this.tarefas$.value.map((t) =>
      t.id === id ? { ...t, status: StatusTarefa.C } : t
    );
    this.tarefas$.next(tarefas);
  }

  transferirTarefa(id: number, novoUsuarioId: number): void {
    const tarefas = this.tarefas$.value.map((t) =>
      t.id === id ? { ...t, usuarioId: novoUsuarioId } : t
    );
    this.tarefas$.next(tarefas);
  }

  atualizarTarefa(id: number, changes: Partial<Tarefa>): void {
    const tarefas = this.tarefas$.value.map((t) =>
      t.id === id ? { ...t, ...changes } : t
    );
    this.tarefas$.next(tarefas);
  }
}
