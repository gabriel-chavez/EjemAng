import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccountClientComponent } from './form-account-client.component';

describe('FormAccountClientComponent', () => {
  let component: FormAccountClientComponent;
  let fixture: ComponentFixture<FormAccountClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAccountClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAccountClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
