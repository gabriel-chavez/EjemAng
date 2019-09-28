import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFavoritesComponent } from './save-favorites.component';

describe('SaveFavoritesComponent', () => {
  let component: SaveFavoritesComponent;
  let fixture: ComponentFixture<SaveFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
