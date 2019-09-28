import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderLoginComponent } from './slider-login.component';

describe('SliderLoginComponent', () => {
  let component: SliderLoginComponent;
  let fixture: ComponentFixture<SliderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
