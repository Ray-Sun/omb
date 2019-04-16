import { TestBed } from '@angular/core/testing';

import { AngularRequestService } from './angular-request.service';

describe('AngularRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularRequestService = TestBed.get(AngularRequestService);
    expect(service).toBeTruthy();
  });
});
