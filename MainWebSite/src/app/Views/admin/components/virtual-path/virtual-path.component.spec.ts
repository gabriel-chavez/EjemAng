import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualPathComponent } from './virtual-path.component';

describe('VirtualPathComponent', () => {
  let component: VirtualPathComponent;
  let fixture: ComponentFixture<VirtualPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
