import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeMonthsAgoComponent } from './three-months-ago.component';

describe('ThreeMonthsAgoComponent', () => {
  let component: ThreeMonthsAgoComponent;
  let fixture: ComponentFixture<ThreeMonthsAgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeMonthsAgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeMonthsAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
