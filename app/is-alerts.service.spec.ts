import { TestBed, inject } from '@angular/core/testing';

import { IsAlertsService } from './is-alerts.service';

describe('IsAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAlertsService]
    });
  });

  it('should be created', inject([IsAlertsService], (service: IsAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
