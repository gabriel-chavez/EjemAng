import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFormsProvidersPaymentsComponent } from './favorite-forms-providers-payments.component';

describe('FavoriteFormsProvidersPaymentsComponent', () => {
  let component: FavoriteFormsProvidersPaymentsComponent;
  let fixture: ComponentFixture<FavoriteFormsProvidersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFormsProvidersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFormsProvidersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
