import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowProvidersPaymentsComponent } from './row-providers-payments.component';

describe('RowProvidersPaymentsComponent', () => {
  let component: RowProvidersPaymentsComponent;
  let fixture: ComponentFixture<RowProvidersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowProvidersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowProvidersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
