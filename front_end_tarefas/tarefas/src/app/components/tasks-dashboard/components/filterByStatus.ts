import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByStatus' })
export class FilterByStatusPipe implements PipeTransform {
  transform(tarefas: any[], status: string): any[] {
    return tarefas.filter((t) => t.status === status);
  }
}
