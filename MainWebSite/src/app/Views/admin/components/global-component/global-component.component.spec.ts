import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalComponentComponent } from './global-component.component';

describe('GlobalComponentComponent', () => {
  let component: GlobalComponentComponent;
  let fixture: ComponentFixture<GlobalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
