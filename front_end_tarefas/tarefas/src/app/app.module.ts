import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ObrigacaoService } from './services/obrigacao.service';
import { TarefaService } from './services/tarefa.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 500,
    }),
  ],
  providers: [UsuarioService, TarefaService, ObrigacaoService],
})
export class AppModule {}
