import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFormsPaymentsOfAssetsComponent } from './favorite-forms-payments-of-assets.component';

describe('FavoriteFormsPaymentsOfAssetsComponent', () => {
  let component: FavoriteFormsPaymentsOfAssetsComponent;
  let fixture: ComponentFixture<FavoriteFormsPaymentsOfAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFormsPaymentsOfAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFormsPaymentsOfAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
