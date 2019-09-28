import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaymentsOfAssetsComponent } from './form-payments-of-assets.component';

describe('FormPaymentsOfAssetsComponent', () => {
  let component: FormPaymentsOfAssetsComponent;
  let fixture: ComponentFixture<FormPaymentsOfAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaymentsOfAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaymentsOfAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
