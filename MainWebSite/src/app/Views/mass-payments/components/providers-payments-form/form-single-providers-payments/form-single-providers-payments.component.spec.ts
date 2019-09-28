import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSingleProvidersPaymentsComponent } from './form-single-providers-payments.component';

describe('FormSingleProvidersPaymentsComponent', () => {
  let component: FormSingleProvidersPaymentsComponent;
  let fixture: ComponentFixture<FormSingleProvidersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSingleProvidersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSingleProvidersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
