import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPreviousFormProvidersDepositInOtherBankCheckComponent } from './load-previous-form-providers-deposit-in-other-bank-check.component';

describe('LoadPreviousFormProvidersDepositInOtherBankCheckComponent', () => {
  let component: LoadPreviousFormProvidersDepositInOtherBankCheckComponent;
  let fixture: ComponentFixture<LoadPreviousFormProvidersDepositInOtherBankCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPreviousFormProvidersDepositInOtherBankCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPreviousFormProvidersDepositInOtherBankCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
