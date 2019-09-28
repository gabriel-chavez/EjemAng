import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsPaymentOfAssetComponent } from './row-list-details-payment-of-asset.component';

describe('RowListDetailsPaymentOfAssetComponent', () => {
  let component: RowListDetailsPaymentOfAssetComponent;
  let fixture: ComponentFixture<RowListDetailsPaymentOfAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsPaymentOfAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsPaymentOfAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
