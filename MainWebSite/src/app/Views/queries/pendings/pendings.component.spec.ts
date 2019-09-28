import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsComponent } from './pendings.component';

describe('PendingsComponent', () => {
  let component: PendingsComponent;
  let fixture: ComponentFixture<PendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
