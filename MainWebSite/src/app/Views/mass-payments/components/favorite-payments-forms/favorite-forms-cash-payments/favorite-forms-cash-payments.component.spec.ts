import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFormsCashPaymentsComponent } from './favorite-forms-cash-payments.component';

describe('FavoriteFormsCashPaymentsComponent', () => {
  let component: FavoriteFormsCashPaymentsComponent;
  let fixture: ComponentFixture<FavoriteFormsCashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFormsCashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFormsCashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
