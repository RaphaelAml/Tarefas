import { Obrigacao } from '../obrigacao/obrigacao.model';
import { Tarefa } from '../tarefa/tarefa.model';
import { Genero } from './generos.enum';
import { TipoUsuario } from './tipo-usuario.enum';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  fotoPerfil: string;
  genero: Genero;
  tipoUsuario: TipoUsuario;
  tarefas: Tarefa[];
  obrigacoes: Obrigacao[];
}
