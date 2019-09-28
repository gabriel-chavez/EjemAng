import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePaymentsSettingsComponent } from './favorite-payments-settings.component';

describe('FavoritePaymentsSettingsComponent', () => {
  let component: FavoritePaymentsSettingsComponent;
  let fixture: ComponentFixture<FavoritePaymentsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePaymentsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePaymentsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
