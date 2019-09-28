import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowSalariesPaymentsComponent } from './row-salaries-payments.component';

describe('RowSalariesPaymentsComponent', () => {
  let component: RowSalariesPaymentsComponent;
  let fixture: ComponentFixture<RowSalariesPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowSalariesPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowSalariesPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
