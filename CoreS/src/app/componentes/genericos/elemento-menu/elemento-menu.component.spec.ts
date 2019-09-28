import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoMenuComponent } from './elemento-menu.component';

describe('ElementoMenuComponent', () => {
  let component: ElementoMenuComponent;
  let fixture: ComponentFixture<ElementoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
