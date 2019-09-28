import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDisbursementComponent } from './auto-disbursement.component';

describe('AutoDisbursementComponent', () => {
  let component: AutoDisbursementComponent;
  let fixture: ComponentFixture<AutoDisbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoDisbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
