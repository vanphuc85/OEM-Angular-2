import { TestBed, inject } from '@angular/core/testing';

import { HeaderinputService } from './headerinput.service';

describe('HeaderinputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderinputService]
    });
  });

  it('should be created', inject([HeaderinputService], (service: HeaderinputService) => {
    expect(service).toBeTruthy();
  }));
});
