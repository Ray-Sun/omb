import { TestBed } from '@angular/core/testing';

import { MessageTipService } from './message-tip.service';

describe('MessageTipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageTipService = TestBed.get(MessageTipService);
    expect(service).toBeTruthy();
  });
});
