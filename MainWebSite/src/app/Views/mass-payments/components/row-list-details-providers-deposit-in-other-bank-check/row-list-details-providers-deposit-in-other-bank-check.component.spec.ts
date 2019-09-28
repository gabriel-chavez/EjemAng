import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsProvidersDepositInOtherBankCheckComponent } from './row-list-details-providers-deposit-in-other-bank-check.component';

describe('RowListDetailsProvidersDepositInOtherBankCheckComponent', () => {
  let component: RowListDetailsProvidersDepositInOtherBankCheckComponent;
  let fixture: ComponentFixture<RowListDetailsProvidersDepositInOtherBankCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsProvidersDepositInOtherBankCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsProvidersDepositInOtherBankCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
