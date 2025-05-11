import { CommonModule } from '@angular/common';
import {Component,ChangeDetectionStrategy,ViewEncapsulation} from '@angular/core';
import { CalendarEvent, CalendarView, CalendarModule } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-calendar-obrigation',
  standalone: true,
  templateUrl: './calendar-obrigation.component.html',
  styleUrls: ['./calendar-obrigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, CalendarModule ],
})
export class CalendarObrigationComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  refresh: Subject<void> = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date('2025-05-10')),
      title: 'DCTF',
      color: { primary: '#1976d2', secondary: '#E3F2FD' },
    },
    {
      start: startOfDay(new Date('2025-05-15')),
      title: 'ICMS',
      color: { primary: '#388e3c', secondary: '#E8F5E9' },
    },
    {
      start: startOfDay(new Date('2025-05-20')),
      title: 'IRPJ',
      color: { primary: '#f57c00', secondary: '#FFF3E0' },
    }
  ];
}
