import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuatRequestFormComponent } from './ruat-request-form.component';

describe('RuatRequestFormComponent', () => {
  let component: RuatRequestFormComponent;
  let fixture: ComponentFixture<RuatRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuatRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuatRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
