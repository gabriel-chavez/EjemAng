import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCargaComponent } from './dialogo-carga.component';

describe('DialogoCargaComponent', () => {
  let component: DialogoCargaComponent;
  let fixture: ComponentFixture<DialogoCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
