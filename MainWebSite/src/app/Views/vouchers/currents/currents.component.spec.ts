import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentsComponent } from './currents.component';

describe('CurrentsComponent', () => {
  let component: CurrentsComponent;
  let fixture: ComponentFixture<CurrentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
