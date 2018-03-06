import { TestBed, inject } from '@angular/core/testing';

import { HeaderbigService } from './headerbig.service';

describe('HeaderbigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderbigService]
    });
  });

  it('should be created', inject([HeaderbigService], (service: HeaderbigService) => {
    expect(service).toBeTruthy();
  }));
});
