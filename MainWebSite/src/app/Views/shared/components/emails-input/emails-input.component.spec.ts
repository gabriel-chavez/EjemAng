import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsInputComponent } from './emails-input.component';

describe('EmailsInputComponent', () => {
  let component: EmailsInputComponent;
  let fixture: ComponentFixture<EmailsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
