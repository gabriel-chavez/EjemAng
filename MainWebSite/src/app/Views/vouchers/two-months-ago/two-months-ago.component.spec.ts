import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMonthsAgoComponent } from './two-months-ago.component';

describe('TwoMonthsAgoComponent', () => {
  let component: TwoMonthsAgoComponent;
  let fixture: ComponentFixture<TwoMonthsAgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoMonthsAgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMonthsAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
