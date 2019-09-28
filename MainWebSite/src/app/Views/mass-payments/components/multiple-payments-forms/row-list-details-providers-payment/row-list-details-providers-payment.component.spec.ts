import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsProvidersPaymentComponent } from './row-list-details-providers-payment.component';

describe('RowListDetailsProvidersPaymentComponent', () => {
  let component: RowListDetailsProvidersPaymentComponent;
  let fixture: ComponentFixture<RowListDetailsProvidersPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsProvidersPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsProvidersPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
