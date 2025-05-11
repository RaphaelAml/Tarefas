import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarObrigationComponent } from './calendar-obrigation.component';

describe('CalendarObrigationComponent', () => {
  let component: CalendarObrigationComponent;
  let fixture: ComponentFixture<CalendarObrigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarObrigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarObrigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
