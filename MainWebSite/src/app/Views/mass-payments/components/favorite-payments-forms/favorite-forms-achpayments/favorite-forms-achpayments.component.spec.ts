import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFormsAchpaymentsComponent } from './favorite-forms-achpayments.component';

describe('FavoriteFormsAchpaymentsComponent', () => {
  let component: FavoriteFormsAchpaymentsComponent;
  let fixture: ComponentFixture<FavoriteFormsAchpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFormsAchpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFormsAchpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
