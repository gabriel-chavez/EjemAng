import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSingleAchComponent } from './form-single-ach.component';

describe('FormSingleAchComponent', () => {
  let component: FormSingleAchComponent;
  let fixture: ComponentFixture<FormSingleAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSingleAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSingleAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
