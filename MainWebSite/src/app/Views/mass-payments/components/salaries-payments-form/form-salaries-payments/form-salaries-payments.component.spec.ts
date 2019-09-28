import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSalariesPaymentsComponent } from './form-salaries-payments.component';

describe('FormSalariesPaymentsComponent', () => {
  let component: FormSalariesPaymentsComponent;
  let fixture: ComponentFixture<FormSalariesPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSalariesPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSalariesPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
