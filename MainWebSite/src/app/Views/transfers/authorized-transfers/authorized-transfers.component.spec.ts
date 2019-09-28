import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedTransfersComponent } from './authorized-transfers.component';

describe('AuthorizedTransfersComponent', () => {
  let component: AuthorizedTransfersComponent;
  let fixture: ComponentFixture<AuthorizedTransfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedTransfersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
