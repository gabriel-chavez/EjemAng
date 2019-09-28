import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepToFollowComponent } from './step-to-follow.component';

describe('StepToFollowComponent', () => {
  let component: StepToFollowComponent;
  let fixture: ComponentFixture<StepToFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepToFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepToFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
