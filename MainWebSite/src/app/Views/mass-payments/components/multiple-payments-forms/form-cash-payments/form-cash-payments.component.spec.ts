import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCashPaymentsComponent } from './form-cash-payments.component';

describe('FormCashPaymentsComponent', () => {
  let component: FormCashPaymentsComponent;
  let fixture: ComponentFixture<FormCashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
