import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPaymentAchComponent } from './row-payment-ach.component';

describe('RowPaymentAchComponent', () => {
  let component: RowPaymentAchComponent;
  let fixture: ComponentFixture<RowPaymentAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowPaymentAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowPaymentAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
