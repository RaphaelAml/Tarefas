import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterObrigationComponent } from './register-obrigation.component';

describe('RegisterObligationComponent', () => {
  let component: RegisterObrigationComponent;
  let fixture: ComponentFixture<RegisterObrigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterObrigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterObrigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
