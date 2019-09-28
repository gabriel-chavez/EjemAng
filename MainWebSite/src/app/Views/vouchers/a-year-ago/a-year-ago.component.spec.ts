import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AYearAgoComponent } from './a-year-ago.component';

describe('AYearAgoComponent', () => {
  let component: AYearAgoComponent;
  let fixture: ComponentFixture<AYearAgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AYearAgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AYearAgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
