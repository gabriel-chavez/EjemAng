import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsCashPaymentComponent } from './row-list-details-cash-payment.component';

describe('RowListDetailsCashPaymentComponent', () => {
  let component: RowListDetailsCashPaymentComponent;
  let fixture: ComponentFixture<RowListDetailsCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
