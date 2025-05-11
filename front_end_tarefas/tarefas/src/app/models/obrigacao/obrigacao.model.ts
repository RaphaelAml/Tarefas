import { Esfera } from './esfera.enum';
import { StatusAtiva } from './status-ativa.enum';
import { TipoObrigacao } from './tipo-obrigacao.enum';

export interface Obrigacao {
  id: number;
  nome: string;
  tipoObrigacao: TipoObrigacao;
  esfera: Esfera;
  antecipa: boolean;
  prorroga: boolean;
  statusAtivaNao: StatusAtiva;
  usuarioId: number;
}
