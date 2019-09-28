import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadManualProvidersDepositInOtherBankCheckComponent } from './load-manual-providers-deposit-in-other-bank-check.component';

describe('LoadManualProvidersDepositInOtherBankCheckComponent', () => {
  let component: LoadManualProvidersDepositInOtherBankCheckComponent;
  let fixture: ComponentFixture<LoadManualProvidersDepositInOtherBankCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadManualProvidersDepositInOtherBankCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadManualProvidersDepositInOtherBankCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
