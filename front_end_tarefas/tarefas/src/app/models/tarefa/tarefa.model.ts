import { StatusAtiva } from '../obrigacao/status-ativa.enum';
import { StatusTarefa } from './status-tarefa.enum';
import { Visibilidade } from './visibilidade.enum';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  status: StatusTarefa;
  visibilidade: Visibilidade;
  statusAtivaNao: StatusAtiva;
  usuarioId: number;
  obrigacaoId: number;
}
