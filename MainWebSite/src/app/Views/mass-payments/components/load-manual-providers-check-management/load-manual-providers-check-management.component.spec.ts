import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadManualProvidersCheckManagementComponent } from './load-manual-providers-check-management.component';

describe('LoadManualProvidersCheckManagementComponent', () => {
  let component: LoadManualProvidersCheckManagementComponent;
  let fixture: ComponentFixture<LoadManualProvidersCheckManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadManualProvidersCheckManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadManualProvidersCheckManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
