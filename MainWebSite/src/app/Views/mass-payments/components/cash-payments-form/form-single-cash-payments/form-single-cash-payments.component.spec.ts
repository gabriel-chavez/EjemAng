import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSingleCashPaymentsComponent } from './form-single-cash-payments.component';

describe('FormSingleCashPaymentsComponent', () => {
  let component: FormSingleCashPaymentsComponent;
  let fixture: ComponentFixture<FormSingleCashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSingleCashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSingleCashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
