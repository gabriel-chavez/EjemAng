import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPaymentOddAchComponent } from './row-payment-odd-ach.component';

describe('RowPaymentOddAchComponent', () => {
  let component: RowPaymentOddAchComponent;
  let fixture: ComponentFixture<RowPaymentOddAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowPaymentOddAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowPaymentOddAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
