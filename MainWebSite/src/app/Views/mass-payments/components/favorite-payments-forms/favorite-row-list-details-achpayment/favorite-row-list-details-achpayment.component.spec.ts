import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRowListDetailsAchpaymentComponent } from './favorite-row-list-details-achpayment.component';

describe('FavoriteRowListDetailsAchpaymentComponent', () => {
  let component: FavoriteRowListDetailsAchpaymentComponent;
  let fixture: ComponentFixture<FavoriteRowListDetailsAchpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRowListDetailsAchpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRowListDetailsAchpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
