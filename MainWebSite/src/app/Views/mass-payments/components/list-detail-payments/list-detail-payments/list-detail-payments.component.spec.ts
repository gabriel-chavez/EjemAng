import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailPaymentsComponent } from './list-detail-payments.component';

describe('ListDetailPaymentsComponent', () => {
  let component: ListDetailPaymentsComponent;
  let fixture: ComponentFixture<ListDetailPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
