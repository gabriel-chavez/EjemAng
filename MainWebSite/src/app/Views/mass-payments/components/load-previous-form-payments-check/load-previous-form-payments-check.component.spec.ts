import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPreviousFormPaymentsCheckComponent } from './load-previous-form-payments-check.component';

describe('LoadPreviousFormPaymentsCheckComponent', () => {
  let component: LoadPreviousFormPaymentsCheckComponent;
  let fixture: ComponentFixture<LoadPreviousFormPaymentsCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPreviousFormPaymentsCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPreviousFormPaymentsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
