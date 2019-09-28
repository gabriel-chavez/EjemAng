import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSingleOddAchComponent } from './form-single-odd-ach.component';

describe('FormSingleOddAchComponent', () => {
  let component: FormSingleOddAchComponent;
  let fixture: ComponentFixture<FormSingleOddAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSingleOddAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSingleOddAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
