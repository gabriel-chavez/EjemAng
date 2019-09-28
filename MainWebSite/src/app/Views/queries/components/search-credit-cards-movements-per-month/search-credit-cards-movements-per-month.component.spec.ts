import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCreditCardsMovementsPerMonthComponent } from './search-credit-cards-movements-per-month.component';

describe('SearchCreditCardsMovementsPerMonthComponent', () => {
  let component: SearchCreditCardsMovementsPerMonthComponent;
  let fixture: ComponentFixture<SearchCreditCardsMovementsPerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCreditCardsMovementsPerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCreditCardsMovementsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
