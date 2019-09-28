import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRowListDetailsProvidersPaymentComponent } from './favorite-row-list-details-providers-payment.component';

describe('FavoriteRowListDetailsProvidersPaymentComponent', () => {
  let component: FavoriteRowListDetailsProvidersPaymentComponent;
  let fixture: ComponentFixture<FavoriteRowListDetailsProvidersPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRowListDetailsProvidersPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRowListDetailsProvidersPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
