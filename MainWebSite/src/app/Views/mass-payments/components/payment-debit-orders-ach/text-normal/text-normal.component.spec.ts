import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNormalComponent } from './text-normal.component';

describe('TextNormalComponent', () => {
  let component: TextNormalComponent;
  let fixture: ComponentFixture<TextNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
