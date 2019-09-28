import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePaymentsDetailComponent } from './favorite-payments-detail.component';

describe('FavoritePaymentsDetailComponent', () => {
  let component: FavoritePaymentsDetailComponent;
  let fixture: ComponentFixture<FavoritePaymentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePaymentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePaymentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
