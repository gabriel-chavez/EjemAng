import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProvidersPaymentsComponent } from './form-providers-payments.component';

describe('FormProvidersPaymentsComponent', () => {
  let component: FormProvidersPaymentsComponent;
  let fixture: ComponentFixture<FormProvidersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProvidersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProvidersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
