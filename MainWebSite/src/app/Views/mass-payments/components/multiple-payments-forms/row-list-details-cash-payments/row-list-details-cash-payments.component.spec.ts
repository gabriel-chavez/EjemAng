import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsCashPaymentsComponent } from './row-list-details-cash-payments.component';

describe('RowListDetailsCashPaymentsComponent', () => {
  let component: RowListDetailsCashPaymentsComponent;
  let fixture: ComponentFixture<RowListDetailsCashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsCashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsCashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
