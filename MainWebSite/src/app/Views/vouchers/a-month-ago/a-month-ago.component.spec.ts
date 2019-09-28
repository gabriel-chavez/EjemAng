import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMonthAgoComponent } from './a-month-ago.component';

describe('AMonthAgoComponent', () => {
  let component: AMonthAgoComponent;
  let fixture: ComponentFixture<AMonthAgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMonthAgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMonthAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
