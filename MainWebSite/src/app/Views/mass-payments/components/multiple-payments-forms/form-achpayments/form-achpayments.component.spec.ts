import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAchpaymentsComponent } from './form-achpayments.component';

describe('FormAchpaymentsComponent', () => {
  let component: FormAchpaymentsComponent;
  let fixture: ComponentFixture<FormAchpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAchpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAchpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
