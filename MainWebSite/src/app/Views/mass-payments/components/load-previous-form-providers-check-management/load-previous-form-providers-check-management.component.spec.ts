import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPreviousFormProvidersCheckManagementComponent } from './load-previous-form-providers-check-management.component';

describe('LoadPreviousFormProvidersCheckManagementComponent', () => {
  let component: LoadPreviousFormProvidersCheckManagementComponent;
  let fixture: ComponentFixture<LoadPreviousFormProvidersCheckManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPreviousFormProvidersCheckManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPreviousFormProvidersCheckManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
