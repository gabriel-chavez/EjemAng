import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsFeaturesComponent } from './functions-features.component';

describe('FunctionsFeaturesComponent', () => {
  let component: FunctionsFeaturesComponent;
  let fixture: ComponentFixture<FunctionsFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionsFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
