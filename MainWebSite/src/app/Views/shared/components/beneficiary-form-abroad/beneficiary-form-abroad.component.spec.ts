import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryFormAbroadComponent } from './beneficiary-form-abroad.component';

describe('BeneficiaryFormAbroadComponent', () => {
  let component: BeneficiaryFormAbroadComponent;
  let fixture: ComponentFixture<BeneficiaryFormAbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryFormAbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryFormAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
