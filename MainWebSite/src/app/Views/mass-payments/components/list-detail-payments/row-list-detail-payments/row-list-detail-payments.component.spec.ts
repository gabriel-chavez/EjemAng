import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailPaymentsComponent } from './row-list-detail-payments.component';

describe('RowListDetailPaymentsComponent', () => {
  let component: RowListDetailPaymentsComponent;
  let fixture: ComponentFixture<RowListDetailPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
