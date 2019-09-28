import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuatDebtDetailComponent } from './ruat-debt-detail.component';

describe('RuatDebtDetailComponent', () => {
  let component: RuatDebtDetailComponent;
  let fixture: ComponentFixture<RuatDebtDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuatDebtDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuatDebtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
