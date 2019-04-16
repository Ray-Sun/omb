import { TestBed } from '@angular/core/testing';

import { NativeRequestService } from './native-request.service';

describe('NativeRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeRequestService = TestBed.get(NativeRequestService);
    expect(service).toBeTruthy();
  });
});
