import { TestBed } from '@angular/core/testing';

import { WristbandService } from './wristband.service';

describe('WristbandService', () => {
  let service: WristbandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WristbandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
