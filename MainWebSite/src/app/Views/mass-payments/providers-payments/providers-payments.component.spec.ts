import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersPaymentsComponent } from './providers-payments.component';

describe('ProvidersPaymentsComponent', () => {
  let component: ProvidersPaymentsComponent;
  let fixture: ComponentFixture<ProvidersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
