import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Obrigacao } from '../models/obrigacao/obrigacao.model';

@Injectable({ providedIn: 'root' })
export class ObrigacaoService {
  private obrigacoes$ = new BehaviorSubject<Obrigacao[]>([]);
  private lastId = 0;

  criarObrigacao(obrigacao: Omit<Obrigacao, 'id'>): Obrigacao {
    const newObrigacao: Obrigacao = {
      ...obrigacao,
      id: ++this.lastId,
    };
    this.obrigacoes$.next([...this.obrigacoes$.value, newObrigacao]);
    return newObrigacao;
  }

  getObrigacoesByUsuario(usuarioId: number): Observable<Obrigacao[]> {
    return this.obrigacoes$.pipe(
      map((obrigacoes) => obrigacoes.filter((o) => o.usuarioId === usuarioId))
    );
  }

  atualizarObrigacao(id: number, changes: Partial<Obrigacao>): void {
    const obrigacoes = this.obrigacoes$.value.map((o) =>
      o.id === id ? { ...o, ...changes } : o
    );
    this.obrigacoes$.next(obrigacoes);
  }

  excluirObrigacao(id: number): void {
    this.obrigacoes$.next(this.obrigacoes$.value.filter((o) => o.id !== id));
  }
}
