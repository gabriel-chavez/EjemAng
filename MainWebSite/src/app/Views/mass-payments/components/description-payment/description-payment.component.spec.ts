import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPaymentComponent } from './description-payment.component';

describe('DescriptionPaymentComponent', () => {
  let component: DescriptionPaymentComponent;
  let fixture: ComponentFixture<DescriptionPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
