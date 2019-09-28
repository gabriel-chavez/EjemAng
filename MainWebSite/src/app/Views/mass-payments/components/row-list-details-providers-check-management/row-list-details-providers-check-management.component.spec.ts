import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListDetailsProvidersCheckManagementComponent } from './row-list-details-providers-check-management.component';

describe('RowListDetailsProvidersCheckManagementComponent', () => {
  let component: RowListDetailsProvidersCheckManagementComponent;
  let fixture: ComponentFixture<RowListDetailsProvidersCheckManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowListDetailsProvidersCheckManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowListDetailsProvidersCheckManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
