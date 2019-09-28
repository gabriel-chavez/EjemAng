import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsAchpaymentComponent } from './row-list-details-achpayment.component';

describe('RowListDetailsAchpaymentComponent', () => {
  let component: RowListDetailsAchpaymentComponent;
  let fixture: ComponentFixture<RowListDetailsAchpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsAchpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsAchpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
