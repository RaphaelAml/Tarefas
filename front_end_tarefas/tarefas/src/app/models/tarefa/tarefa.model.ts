import { StatusTarefa } from './status-tarefa.enum';
import { Visibilidade } from './visibilidade.enum';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  status: StatusTarefa;
  visibilidade: Visibilidade;
  statusAtivaNao: 'S' | 'N';
  usuarioId: number;
  obrigacaoId?: number;


  tipoObrigacao?: 'I' | 'D';
  esfera?: 'F' | 'E' | 'M';
  antecipa?: boolean;
  prorroga?: boolean;
  departamento?: string;
}

