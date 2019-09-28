import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPaymentsSchedulesComponent } from './list-of-payments-schedules.component';

describe('ListOfPaymentsSchedulesComponent', () => {
  let component: ListOfPaymentsSchedulesComponent;
  let fixture: ComponentFixture<ListOfPaymentsSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfPaymentsSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPaymentsSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
