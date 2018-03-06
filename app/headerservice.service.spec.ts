import { TestBed, inject } from '@angular/core/testing';

import { HeaderserviceService } from './headerservice.service';

describe('HeaderserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderserviceService]
    });
  });

  it('should be created', inject([HeaderserviceService], (service: HeaderserviceService) => {
    expect(service).toBeTruthy();
  }));
});
