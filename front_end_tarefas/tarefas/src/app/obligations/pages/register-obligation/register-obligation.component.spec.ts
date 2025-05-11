import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterObligationComponent } from './register-obligation.component';

describe('RegisterObligationComponent', () => {
  let component: RegisterObligationComponent;
  let fixture: ComponentFixture<RegisterObligationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterObligationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
