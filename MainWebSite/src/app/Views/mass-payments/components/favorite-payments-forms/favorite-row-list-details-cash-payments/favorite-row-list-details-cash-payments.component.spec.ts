import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRowListDetailsCashPaymentsComponent } from './favorite-row-list-details-cash-payments.component';

describe('FavoriteRowListDetailsCashPaymentsComponent', () => {
  let component: FavoriteRowListDetailsCashPaymentsComponent;
  let fixture: ComponentFixture<FavoriteRowListDetailsCashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRowListDetailsCashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRowListDetailsCashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
