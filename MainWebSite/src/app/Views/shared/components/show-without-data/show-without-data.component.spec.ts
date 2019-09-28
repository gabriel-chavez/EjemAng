import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWithoutDataComponent } from './show-without-data.component';

describe('ShowWithoutDataComponent', () => {
  let component: ShowWithoutDataComponent;
  let fixture: ComponentFixture<ShowWithoutDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWithoutDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWithoutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
