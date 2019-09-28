import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEndComponent } from './generate-end.component';

describe('GenerateEndComponent', () => {
  let component: GenerateEndComponent;
  let fixture: ComponentFixture<GenerateEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
