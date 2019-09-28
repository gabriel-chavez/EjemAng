import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableOfficesComponent } from './timetable-offices.component';

describe('TimetableOfficesComponent', () => {
  let component: TimetableOfficesComponent;
  let fixture: ComponentFixture<TimetableOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
