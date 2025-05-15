import { TestBed } from '@angular/core/testing';

import { ProfilesManagementService } from './profiles-management.service';

describe('ProfilesManagementService', () => {
  let service: ProfilesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
