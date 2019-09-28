import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAccountsComponent } from './target-accounts.component';

describe('TargetAccountsComponent', () => {
  let component: TargetAccountsComponent;
  let fixture: ComponentFixture<TargetAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
