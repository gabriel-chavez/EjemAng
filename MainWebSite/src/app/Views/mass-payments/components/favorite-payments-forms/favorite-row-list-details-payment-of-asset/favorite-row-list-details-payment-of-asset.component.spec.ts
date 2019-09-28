import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRowListDetailsPaymentOfAssetComponent } from './favorite-row-list-details-payment-of-asset.component';

describe('FavoriteRowListDetailsPaymentOfAssetComponent', () => {
  let component: FavoriteRowListDetailsPaymentOfAssetComponent;
  let fixture: ComponentFixture<FavoriteRowListDetailsPaymentOfAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRowListDetailsPaymentOfAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRowListDetailsPaymentOfAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
