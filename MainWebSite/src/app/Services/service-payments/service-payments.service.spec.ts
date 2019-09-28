import { TestBed, inject } from '@angular/core/testing';

import { ServicePaymentsService } from './service-payments.service';

describe('ServicePaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePaymentsService]
    });
  });

  it('should be created', inject([ServicePaymentsService], (service: ) => {
    expect(service).toBeTruthy();
  }));
});
