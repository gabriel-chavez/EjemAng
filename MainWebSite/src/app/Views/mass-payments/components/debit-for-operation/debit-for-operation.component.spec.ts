import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitForOperationComponent } from './debit-for-operation.component';

describe('DebitForOperationComponent', () => {
  let component: DebitForOperationComponent;
  let fixture: ComponentFixture<DebitForOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitForOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitForOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
