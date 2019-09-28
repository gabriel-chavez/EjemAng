import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAbroadConfirmComponent } from './transfer-abroad-confirm.component';

describe('TransferAbroadConfirmComponent', () => {
  let component: TransferAbroadConfirmComponent;
  let fixture: ComponentFixture<TransferAbroadConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferAbroadConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAbroadConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
