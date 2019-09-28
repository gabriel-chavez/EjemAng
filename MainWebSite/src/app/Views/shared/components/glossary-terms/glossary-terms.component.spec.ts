import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryTermsComponent } from './glossary-terms.component';

describe('GlossaryTermsComponent', () => {
  let component: GlossaryTermsComponent;
  let fixture: ComponentFixture<GlossaryTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
