import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLoginComponent } from './master-login.component';

describe('MasterLoginComponent', () => {
  let component: MasterLoginComponent;
  let fixture: ComponentFixture<MasterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
