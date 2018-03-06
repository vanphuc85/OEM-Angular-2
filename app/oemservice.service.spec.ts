import { TestBed, inject } from '@angular/core/testing';

import { OemserviceService } from './oemservice.service';

describe('OemserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OemserviceService]
    });
  });

  it('should be created', inject([OemserviceService], (service: OemserviceService) => {
    expect(service).toBeTruthy();
  }));
});
