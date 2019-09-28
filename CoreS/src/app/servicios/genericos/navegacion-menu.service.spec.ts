import { TestBed } from '@angular/core/testing';

import { NavegacionMenuService } from './navegacion-menu.service';

describe('NavegacionMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavegacionMenuService = TestBed.get(NavegacionMenuService);
    expect(service).toBeTruthy();
  });
});
